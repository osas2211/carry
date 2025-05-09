pub mod constants;
pub mod errors;
pub mod instructions;
pub mod state;

use anchor_lang::prelude::*;

pub use constants::*;
pub use errors::*;
pub use instructions::*;
pub use state::*;

declare_id!("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT");

#[program]
pub mod contracts {
    use super::*;

    // CREATE DELIVERY
    pub fn create_delivery(
        ctx: Context<CreateDeliveryJob>,
        index: u64,
        reward: u64,
        eta: u64,
    ) -> Result<()> {
        _create_delivery(ctx, index, reward, eta)
    }

    // CONFIRM DELIVERY
    pub fn confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, _index: u64) -> Result<()> {
        _confirm_delivery(ctx, _index)
    }

    // ACCEPT DELIVERY JOB
    pub fn accept_delivery_job(
        ctx: Context<CourierDeliveryAcceptJob>,
        _index: u64,
        creator: Pubkey,
    ) -> Result<()> {
        _accept_delivery_job(ctx, _index, creator)
    }
}
