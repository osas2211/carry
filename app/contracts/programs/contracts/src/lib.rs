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

    // INITIALIZE CONFIGS
    pub fn initialize_config(ctx: Context<InitializeConfig>, ranges: Vec<RangeUri>) -> Result<()> {
        _initialize_config(ctx, ranges)
    }

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
    pub fn confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, index: u64) -> Result<()> {
        _confirm_delivery(ctx, index)
    }

    // ACCEPT DELIVERY JOB
    pub fn accept_delivery_job(ctx: Context<CourierDeliveryAcceptJob>, index: u64) -> Result<()> {
        _accept_delivery_job(ctx, index)
    }

    // REGISTER AS RIDER
    pub fn register_rider(ctx: Context<RegisterRider>) -> Result<()> {
        _register_rider(ctx)
    }

    // GIVE A RIDER REVIEW FOR A DELIVERY
    pub fn review_rider(ctx: Context<ReviewRiderCtx>, index: u64, rating: u64) -> Result<()> {
        _review_rider(ctx, rating, index)
    }
}
