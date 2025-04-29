use anchor_lang::prelude::*;

declare_id!("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT");

const ANCHOR_DISCRIMINATOR: usize = 8;

#[program]
pub mod contracts {
    use anchor_lang::solana_program::{self};

    use super::*;

    // CREATE DELIVERY
    pub fn create_delivery(
        ctx: Context<CreateDeliveryJob>,
        index: u64,
        reward: u64,
        eta: u64,
    ) -> Result<()> {
        let clock = Clock::get()?;
        // Now you can use:
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
        // delivery.escrow = *escrow.key;

        let transfer_instruction =
            solana_program::system_instruction::transfer(creator.key, escrow.key, reward);
        solana_program::program::invoke(
            &transfer_instruction,
            &[creator.to_account_info(), escrow.clone()],
        )?;

        Ok(())
    }

    // CONFIRM DELIVERY
    pub fn confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, _index: u64) -> Result<()> {
        let delivery = &mut ctx.accounts.delivery;
        delivery.status = String::from(DeliveryStatus::Delivered.as_str());
        Ok(())
    }
}

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
        mut,
        seeds = [b"vault", creator.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
    )]
    pub escrow: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct ConfirmDeliveryStatus<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = [signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
        realloc = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        realloc::payer = signer,
        realloc::zero = true
    )]
    pub delivery: Account<'info, Delivery>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Delivery {
    creator: Pubkey,
    courier: Option<Pubkey>,
    #[max_len(50)]
    status: String,
    reward: u64,
    index: u64,
    #[max_len(1000)]
    metadata_hash: Option<String>,
    created_at: u64,
    estimated_time_of_arrival: u64,
    // escrow: Pubkey,
}

pub enum DeliveryStatus {
    Active,
    Delivered,
}

impl DeliveryStatus {
    fn as_str(&self) -> &'static str {
        match self {
            DeliveryStatus::Active => "ACTIVE",
            DeliveryStatus::Delivered => "DELIVERED",
        }
    }
}
