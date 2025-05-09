use crate::constants::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct CreateDeliveryJob<'info> {
    #[account(
        init,
        seeds = [creator.key().as_ref(), index.to_le_bytes().as_ref()], // Seeds for PDA generation
        bump,
        space = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE, // Space allocation for account
        payer = creator // Creator pays for account creation
    )]
    pub delivery: Account<'info, Delivery>, // Account to store delivery job details

    #[account(mut)]
    pub creator: Signer<'info>, // Creator/sender who pays for the transaction

    #[account(
        init_if_needed,
        payer = creator,
        seeds = [b"escrow", creator.key().as_ref(), &index.to_le_bytes()], // Seeds for escrow PDA
        bump,
        space = 0,
    )]
    pub escrow: AccountInfo<'info>, // Escrow account to hold reward funds

    pub system_program: Program<'info, System>, // Required for system operations
}

pub fn _create_delivery(
    ctx: Context<CreateDeliveryJob>,
    index: u64,  // Unique identifier for delivery
    reward: u64, // Payment amount for delivery
    eta: u64,    // Estimated arrival time (unix timestamp)
) -> Result<()> {
    let clock = Clock::get()?;
    let current_unix_timestamp = clock.unix_timestamp; // Get current time

    let delivery = &mut ctx.accounts.delivery; // Initialize delivery account
    delivery.index = index;
    delivery.creator = *ctx.accounts.creator.key;
    delivery.reward = reward;
    delivery.estimated_time_of_arrival = eta;
    delivery.status = String::from(DeliveryStatus::Active.as_str());
    delivery.created_at = current_unix_timestamp as u64;
    delivery.escrow = *ctx.accounts.escrow.key;
    delivery.bump = ctx.bumps.delivery;
    delivery.escrow_bump = ctx.bumps.escrow;
    delivery.rider_rated = false;

    // Transfer reward amount to escrow account
    let cpi_accounts = Transfer {
        from: ctx.accounts.creator.to_account_info(),
        to: ctx.accounts.escrow.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    transfer(cpi_ctx, reward)?;

    Ok(())
}
