use anchor_lang::prelude::*;

use crate::constants::*;
use crate::errors::*;
use crate::state::*;
use anchor_lang::system_program::{transfer, Transfer};

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct ConfirmDeliveryStatus<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = [signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.bump,
        realloc = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        realloc::payer = signer,
        realloc::zero = true
    )]
    pub delivery: Account<'info, Delivery>,

    /// CHECK: Verification will be made manually
    #[account(
        mut,
        seeds= [b"escrow", signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.escrow_bump,
    )]
    pub escrow: AccountInfo<'info>,

    /// CHECK: This account will be checked manually
    pub courier_account: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn _confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, _index: u64) -> Result<()> {
    let delivery = &mut ctx.accounts.delivery;
    let courier = delivery.courier.ok_or(CustomError::NoCourierAssigned)?;

    require!(
        delivery.status == String::from(DeliveryStatus::InProgress.as_str()),
        CustomError::JobNotAcceptedYet
    );

    require_keys_eq!(
        courier,
        ctx.accounts.courier_account.key(),
        CustomError::InvalidCourierAccount
    );

    let escrow_seeds = &[
        b"escrow",
        ctx.accounts.signer.key.as_ref(),
        &_index.to_be_bytes(),
        &[delivery.escrow_bump],
    ];
    let signer = &[&escrow_seeds[..]];

    // Transfer lamports from escrow account to recipient
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

    delivery.status = String::from(DeliveryStatus::Delivered.as_str());

    Ok(())
}
