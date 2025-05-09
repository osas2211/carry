use anchor_lang::prelude::*;

#[account]
#[derive(InitSpace)]
pub struct Config {
    pub authority: Pubkey,
    #[max_len(32)]
    pub ranges: Vec<RangeUri>,
    pub collection_mint: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct RangeUri {
    pub min: u64,
    pub max: u64,
    #[max_len(100)]
    pub uri: String,
}
