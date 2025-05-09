use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Delivery {
    pub creator: Pubkey,
    pub courier: Option<Pubkey>,
    #[max_len(50)]
    pub status: String,
    pub reward: u64,
    pub index: u64,
    #[max_len(1000)]
    pub metadata_hash: Option<String>,
    pub created_at: u64,
    pub estimated_time_of_arrival: u64,
    pub escrow: Pubkey,
    pub bump: u8,
    pub escrow_bump: u8,
}
