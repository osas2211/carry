use anchor_lang::{prelude::*, solana_program::pubkey};

#[constant]
pub const SEED: &str = "anchor";

pub const ANCHOR_DISCRIMINATOR: usize = 8;

#[constant]
pub const ADMIN_ADDRESS: Pubkey = pubkey!("4kg8oh3jdNtn7j2wcS7TrUua31AgbLzDVkBZgTAe44aF");

pub const TITLE: &str = "Rider NFT";
pub const SYMBOL: &str = "RIDER";
pub const BASIC_URI: &str = "https://arweave.net/default_rider_metadata.json";
pub const COLLECTION_URI: &str = "https://arweave.net/default_rider_metadata.json";

pub const PRECISION: u64 = 1000;
