use crate::errors::*;
use crate::state::*;
use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};
use mpl_token_metadata::accounts::Metadata as MetadataAccount;

/// Accounts required for accepting a delivery job by a courier
#[derive(Accounts)]
#[instruction(index: u64, creator: Pubkey)]
pub struct CourierDeliveryAcceptJob<'info> {
    /// The courier accepting the delivery job
    #[account(mut)]
    pub courier: Signer<'info>,

    /// Global configuration account
    #[account(mut)]
    pub config: Account<'info, Config>,

    /// Delivery account, PDA derived from creator and index
    #[account(
        mut,
        seeds = [creator.as_ref(), index.to_le_bytes().as_ref()],
        bump = delivery.bump,
    )]
    pub delivery: Account<'info, Delivery>,

    /// The NFT mint that proves courier's eligibility
    pub nft_mint: Account<'info, Mint>,

    /// Courier's Associated Token Account holding the NFT
    #[account(
        constraint = courier_nft_token_account.owner == courier.key(),
        constraint = courier_nft_token_account.mint == nft_mint.key(),
        constraint = courier_nft_token_account.amount == 1 @ CustomError::NftOwnershipRequired,
    )]
    pub courier_nft_token_account: Account<'info, TokenAccount>,

    /// Metadata account for the courier's NFT
    /// CHECK: Verified in handler through safe deserialization
    pub nft_metadata: UncheckedAccount<'info>,

    /// Required for system operations
    pub system_program: Program<'info, System>,
}

/// Process the acceptance of a delivery job by a courier
pub fn _accept_delivery_job(ctx: Context<CourierDeliveryAcceptJob>, _index: u64) -> Result<()> {
    // Get the expected collection mint from config
    let expected_collection_key = &ctx.accounts.config.collection_mint;
    let delivery = &mut ctx.accounts.delivery;

    // Verify delivery is available
    require!(delivery.status == "ACTIVE", CustomError::JobNotAvailable);
    require!(delivery.courier.is_none(), CustomError::JobBlocked);

    // Deserialize and verify NFT metadata
    let metadata =
        MetadataAccount::safe_deserialize(&ctx.accounts.nft_metadata.try_borrow_data()?)?;

    // Verify the NFT belongs to the correct verified collection
    require!(
        metadata
            .collection
            .as_ref()
            .map(|c| c.key == *expected_collection_key && c.verified)
            .unwrap_or(false),
        CustomError::CollectionNotVerified
    );

    // Update delivery status
    delivery.courier = Some(*ctx.accounts.courier.key);
    delivery.status = String::from(DeliveryStatus::InProgress.as_str());

    Ok(())
}
