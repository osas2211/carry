use anchor_lang::prelude::*;

use crate::constants::*;
use crate::state::*;
use anchor_lang::system_program::{Transfer, transfer};

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct CreateDeliveryJob<'info> {
    #[account(
        init,
        seeds = [creator.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
        space = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        payer = creator
    )]
    pub delivery: Account<'info, Delivery>,

    #[account(mut)]
    pub creator: Signer<'info>,

    /// CHECK: This account holds Token only, no state manipulation
    #[account(
        init_if_needed,               
        payer = creator,
        seeds = [b"escrow", creator.key().as_ref(), &index.to_le_bytes()],
        bump,
        space = 0,                   
    )]
    pub escrow: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

pub fn _create_delivery(
    ctx: Context<CreateDeliveryJob>,
    index: u64,
    reward: u64,
    eta: u64,
) -> Result<()> {
    let clock = Clock::get()?;
    let creator = &ctx.accounts.creator;
    let escrow = &ctx.accounts.escrow;
    let current_unix_timestamp = clock.unix_timestamp;
    let delivery = &mut ctx.accounts.delivery;
    delivery.index = index;
    delivery.creator = *creator.key;
    delivery.reward = reward;
    delivery.estimated_time_of_arrival = eta;
    delivery.status = String::from(DeliveryStatus::Active.as_str());
    delivery.created_at = current_unix_timestamp as u64;
    delivery.escrow = *escrow.key;
    delivery.bump = ctx.bumps.delivery;
    delivery.escrow_bump = ctx.bumps.escrow;


    let cpi_accounts = Transfer {
        from: creator.to_account_info(),
        to: escrow.to_account_info(),
    };
    
    let cpi_ctx = CpiContext::new(ctx.accounts.system_program.to_account_info(), cpi_accounts);
    
    transfer(cpi_ctx, reward)?;

    // let transfer_instruction = system_instruction::transfer(creator.key, escrow.key, reward);
    // program::invoke(
    //     &transfer_instruction,
    //     &[
    //         creator.to_account_info(),
    //         escrow.clone(),
    //         ctx.accounts.system_program.to_account_info(),
    //     ],
    // )?;

    Ok(())
}
