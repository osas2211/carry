use anchor_lang::prelude::*;

use crate::errors::*;
use crate::state::*;

#[derive(Accounts)]
#[instruction(index: u64, creator: Pubkey)]
pub struct CourierDeliveryAcceptJob<'info> {
    #[account(mut)]
    pub courier: Signer<'info>,
    #[account(
        mut,
        seeds = [creator.as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.bump,
    )]
    pub delivery: Account<'info, Delivery>,
    pub system_program: Program<'info, System>,
}

pub fn _accept_delivery_job(
    ctx: Context<CourierDeliveryAcceptJob>,
    _index: u64,
    creator: Pubkey,
) -> Result<()> {
    let delivery = &mut ctx.accounts.delivery;

    require!(delivery.status == "ACTIVE", CustomError::JobNotAvailable);
    require_keys_neq!(
        creator,
        *ctx.accounts.courier.key,
        CustomError::CreatorAcceptJobBlocked
    );
    delivery.courier = Some(*ctx.accounts.courier.key);
    delivery.status = String::from(DeliveryStatus::InProgress.as_str());
    Ok(())
}
