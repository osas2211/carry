use crate::constants::*;
use crate::state::*;
use crate::CustomError;
use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::{
        mpl_token_metadata::types::DataV2, update_metadata_accounts_v2, MetadataAccount,
        UpdateMetadataAccountsV2,
    },
    token::Mint,
};

/// Context for updating rider NFT URI based on their ratings
#[derive(Accounts)]
#[instruction(index: u64)]
pub struct ReviewRiderCtx<'info> {
    // Authority that can sign the transaction
    #[account(mut)]
    pub signer: Signer<'info>,

    // Global configuration account
    #[account(mut)]
    pub config: Account<'info, Config>,

    // Delivery PDA derived from signer and delivery index
    #[account(
      seeds = [signer.key().as_ref(), index.to_le_bytes().as_ref()],
      bump = delivery.bump,
    )]
    pub delivery: Account<'info, Delivery>,

    // Rider account PDA storing rating information
    #[account(
      mut,
      seeds = [b"rider", delivery.courier.unwrap().as_ref()],
      bump = rider_account.bump,
    )]
    pub rider_account: Account<'info, RiderAccount>,

    // NFT mint account
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    // NFT metadata account that will be updated
    /// CHECK: Handled by CPI
    #[account(mut)]
    pub metadata: Account<'info, MetadataAccount>,

    // PDA with authority to update metadata
    #[account(seeds = [b"metadata_authority"], bump)]
    pub update_authority: UncheckedAccount<'info>,

    // Metaplex token metadata program
    /// CHECK: Handled by CPI
    pub token_metadata_program: AccountInfo<'info>,
}

/// Updates the URI of a rider's NFT based on their new rating
fn update_rider_ranking(ctx: Context<ReviewRiderCtx>, new_uri: String) -> Result<()> {
    // Prepare CPI accounts for metadata update
    let cpi_accounts = UpdateMetadataAccountsV2 {
        metadata: ctx.accounts.metadata.to_account_info(),
        update_authority: ctx.accounts.update_authority.to_account_info(),
    };

    // Generate PDA signer seeds
    let authority_seeds: &[&[u8]; 2] = &[b"metadata_authority", &[ctx.bumps.update_authority]];
    let signer = &[&authority_seeds[..]];

    // Create CPI context with PDA signer
    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_metadata_program.clone(),
        cpi_accounts,
        signer,
    );

    // Preserve original metadata while updating URI
    let original_metadata = DataV2 {
        name: ctx.accounts.metadata.name.clone(),
        symbol: ctx.accounts.metadata.symbol.clone(),
        uri: ctx.accounts.metadata.uri.clone(),
        seller_fee_basis_points: ctx.accounts.metadata.seller_fee_basis_points.clone(),
        creators: ctx.accounts.metadata.creators.clone(),
        collection: ctx.accounts.metadata.collection.clone(),
        uses: ctx.accounts.metadata.uses.clone(),
    };

    // Create new metadata with updated URI
    let new_metadata = DataV2 {
        uri: new_uri.clone(),
        ..original_metadata
    };

    // Update metadata via CPI
    update_metadata_accounts_v2(cpi_ctx, None, Some(new_metadata), None, None)?;

    Ok(())
}

/// Calculates new average rating and count after adding a new rating
fn calculate_new_rating(
    avg_rating: u64,
    num_ratings: u64,
    new_rating: u64,
    _index: u64,
) -> (u64, u64) {
    // Calculate total sum of ratings
    let total_rating = avg_rating.checked_mul(num_ratings).unwrap();

    // Scale new rating by precision factor
    let scaled_new_rating = new_rating.checked_mul(PRECISION).unwrap();

    // Add new rating to total
    let new_total = total_rating.checked_add(scaled_new_rating).unwrap();

    // Increment rating count
    let new_count = num_ratings.checked_add(1).unwrap();

    // Calculate new average
    let new_avg = new_total.checked_div(new_count).unwrap();

    (new_count, new_avg)
}

/// Determines appropriate URI based on rider's average rating
fn get_rider_ranking_uri(ctx: &Context<ReviewRiderCtx>, avg_rating: u64) -> Result<String> {
    // Find matching URI range for the given rating
    let ranking_uri = ctx
        .accounts
        .config
        .ranges
        .iter()
        .find(|r| avg_rating >= r.min && avg_rating <= r.max)
        .map(|r| r.uri.clone())
        .ok_or(CustomError::NoMatchingUri)?;

    Ok(ranking_uri)
}

/// Main instruction handler for reviewing a rider
pub fn _review_rider(ctx: Context<ReviewRiderCtx>, new_rating: u64, index: u64) -> Result<()> {
    let delivery = &ctx.accounts.delivery;

    // Ensure rider hasn't been rated already
    require!(!delivery.rider_rated, CustomError::RiderAlreadyReviewed);

    let rider_account = &mut ctx.accounts.rider_account;

    // Calculate new rating statistics
    let (new_num_ratings, new_avg_rating) = calculate_new_rating(
        rider_account.avg_rating,
        rider_account.num_ratings,
        new_rating,
        index,
    );

    // Update rider account with new stats
    rider_account.avg_rating = new_avg_rating;
    rider_account.num_ratings = new_num_ratings;

    // Get appropriate URI for new rating
    let ranking_uri = get_rider_ranking_uri(&ctx, new_avg_rating)?;

    // Only update URI if it has changed
    let current_ranking_uri = &ctx.accounts.metadata.uri;
    if &ranking_uri != current_ranking_uri {
        update_rider_ranking(ctx, ranking_uri)?;
    }

    Ok(())
}
