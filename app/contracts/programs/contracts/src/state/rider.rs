use anchor_lang::prelude::*;

/// Rider account storing NFT stats
#[account]
#[derive(InitSpace)]
pub struct RiderAccount {
    pub bump: u8,
    pub num_rides: u64,
    pub avg_rating: u64,
    pub num_ratings: u64,
}
