use anchor_lang::prelude::*;

declare_id!("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT");

const ANCHOR_DISCRIMINATOR: usize = 8;

#[program]
pub mod contracts {
    use super::*;
    pub fn create_delivery(
        ctx: Context<CreateDeliveryJob>,
        index: u64,
        reward: u64,
        eta: u64,
    ) -> Result<()> {
        let clock = Clock::get()?;
        // Now you can use:
        let current_unix_timestamp = clock.unix_timestamp;
        let delivery = &mut ctx.accounts.delivery;
        delivery.index = index;
        delivery.creator = *ctx.accounts.creator.key;
        delivery.reward = reward;
        delivery.estimated_time_of_arrival = eta;
        delivery.status = DeliveryStatus::Active;
        delivery.created_at = current_unix_timestamp as u64;
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
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Delivery {
    creator: Pubkey,
    courier: Option<Pubkey>,
    status: DeliveryStatus,
    reward: u64,
    index: u64,
    #[max_len(1000)]
    metadata_hash: Option<String>,
    created_at: u64,
    estimated_time_of_arrival: u64,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub enum DeliveryStatus {
    Active,
    Delivered,
}

impl anchor_lang::Space for DeliveryStatus {
    const INIT_SPACE: usize = 1; // Assuming 1 byte is sufficient to store the enum variant
}
