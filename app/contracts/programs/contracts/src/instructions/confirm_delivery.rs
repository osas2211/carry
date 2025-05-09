use crate::{constants::*, errors::*, state::*};
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

/// Accounts struct for confirming delivery completion
#[derive(Accounts)]
#[instruction(index: u64)]
pub struct ConfirmDeliveryStatus<'info> {
    /// The transaction signer (customer)
    #[account(mut)]
    pub signer: Signer<'info>,

    /// The delivery account, containing delivery details
    #[account(
        mut,
        seeds = [signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.bump,
        realloc = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        realloc::payer = signer,
        realloc::zero = true
    )]
    pub delivery: Account<'info, Delivery>,

    /// The rider's account storing their statistics
    #[account(
        mut,
        seeds = [b"rider", delivery.courier.unwrap().as_ref()],
        bump = rider_account.bump,
    )]
    pub rider_account: Account<'info, RiderAccount>,

    /// Escrow account holding the payment
    /// CHECK: Verification done through seeds and PDAs
    #[account(
        mut,
        seeds = [b"escrow", signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.escrow_bump,
    )]
    pub escrow: AccountInfo<'info>,

    /// The courier's wallet account to receive payment
    /// CHECK: Verified against delivery.courier
    pub courier_account: AccountInfo<'info>,

    /// Required for transfer instruction
    pub system_program: Program<'info, System>,
}

/// Confirms delivery completion and transfers payment to courier
pub fn _confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, _index: u64) -> Result<()> {
    let delivery = &mut ctx.accounts.delivery;
    let courier = delivery.courier.ok_or(CustomError::NoCourierAssigned)?;

    // Verify delivery is in progress
    require!(
        delivery.status == String::from(DeliveryStatus::InProgress.as_str()),
        CustomError::JobNotAcceptedYet
    );

    // Verify courier account matches the assigned courier
    require_keys_eq!(
        courier,
        ctx.accounts.courier_account.key(),
        CustomError::InvalidCourierAccount
    );

    // Set up escrow PDA signer
    let escrow_seeds: &[&[u8]; 4] = &[
        b"escrow",
        ctx.accounts.signer.key.as_ref(),
        &_index.to_be_bytes(),
        &[delivery.escrow_bump],
    ];
    let signer = &[&escrow_seeds[..]];

    // Transfer reward from escrow to courier
    let cpi_accounts = Transfer {
        from: ctx.accounts.escrow.to_account_info(),
        to: ctx.accounts.courier_account.to_account_info(),
    };

    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.system_program.to_account_info(),
        cpi_accounts,
        signer,
    );

    transfer(cpi_ctx, delivery.reward)?;

    // Update rider statistics
    let rider_account = &mut ctx.accounts.rider_account;
    rider_account.num_rides += 1;

    // Mark delivery as completed
    delivery.status = String::from(DeliveryStatus::Delivered.as_str());

    Ok(())
}
