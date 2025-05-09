use crate::state::RiderAccount;
use crate::{constants::*, Config};
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::Metadata,
    token::{Mint, Token, TokenAccount},
};
use mpl_token_metadata::{
    accounts::{MasterEdition, Metadata as MetadataAccount},
    instructions::{CreateV1CpiBuilder, MintV1CpiBuilder, VerifyCollectionV1CpiBuilder},
    types::{PrintSupply, TokenStandard},
};

/// Account structure for the RegisterRider instruction
#[derive(Accounts)]
pub struct RegisterRider<'info> {
    // Admin who pays for the transaction
    #[account(mut, address = ADMIN_ADDRESS)]
    pub payer: Signer<'info>,

    // Program configuration account
    #[account(mut)]
    pub config: Account<'info, Config>,

    // The rider's wallet account
    #[account(mut)]
    rider: AccountInfo<'info>,

    // PDA to store rider's statistics and data
    #[account(
    init,
    payer = payer,
    seeds = [b"rider", rider.key().as_ref()],
    bump,
    space = ANCHOR_DISCRIMINATOR + RiderAccount::INIT_SPACE)
  ]
    pub rider_account: Account<'info, RiderAccount>,

    // NFT mint account being created
    #[account(
    init,
    payer = payer,
    mint::decimals = 0,
    mint::authority = payer,
    mint::token_program = token_program,
  )]
    pub mint: Account<'info, Mint>,

    // Collection mint account for NFT verification
    #[account(
    mint::token_program = token_program,
  )]
    pub collection_mint: Account<'info, Mint>,

    // Associated Token Account for the rider's NFT
    #[account(
    init,
    payer = payer,
    associated_token::mint = mint,
    associated_token::authority = rider,
    associated_token::token_program = token_program,
  )]
    pub rider_ata: Account<'info, TokenAccount>,

    // Master Edition PDA for the NFT
    #[account(
    mut,
    address = MasterEdition::find_pda(&mint.key()).0,
  )]
    pub master_edition: UncheckedAccount<'info>,

    // Metadata PDA for the NFT
    #[account(
    mut,
    address = MetadataAccount::find_pda(&mint.key()).0,
  )]
    pub metadata_account: UncheckedAccount<'info>,

    // PDA that acts as the update authority for the NFT
    #[account(seeds = [b"metadata_authority"], bump)]
    pub update_authority: UncheckedAccount<'info>,

    // Required program accounts
    pub metadata_program: Program<'info, Metadata>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    /// CHECK: Used by Metaplex
    pub sysvar_instruction: UncheckedAccount<'info>,
}

/// Creates the NFT metadata accounts using Metaplex
pub fn create_nft_accounts(ctx: &Context<RegisterRider>) -> Result<()> {
    CreateV1CpiBuilder::new(&ctx.accounts.metadata_program)
        .metadata(&ctx.accounts.metadata_account)
        .mint(&ctx.accounts.mint.to_account_info(), false)
        .authority(&ctx.accounts.payer)
        .payer(&ctx.accounts.payer)
        .update_authority(&ctx.accounts.update_authority, false)
        .master_edition(Some(&ctx.accounts.master_edition))
        .system_program(&ctx.accounts.system_program)
        .sysvar_instructions(&ctx.accounts.sysvar_instruction.to_account_info())
        .spl_token_program(Some(&ctx.accounts.token_program))
        .token_standard(TokenStandard::NonFungible)
        .seller_fee_basis_points(0)
        .name(TITLE.to_string())
        .symbol(SYMBOL.to_string())
        .uri(BASIC_URI.to_string())
        .print_supply(PrintSupply::Zero)
        .collection_details(mpl_token_metadata::types::CollectionDetails::V1 { size: 0 })
        .invoke()?;

    Ok(())
}

/// Mints the NFT to the rider's Associated Token Account
pub fn mint_nft(ctx: &Context<RegisterRider>) -> Result<()> {
    MintV1CpiBuilder::new(&ctx.accounts.metadata_program)
        .token(&ctx.accounts.rider_ata.to_account_info())
        .token_owner(Some(&ctx.accounts.rider))
        .metadata(&ctx.accounts.metadata_account)
        .master_edition(Some(&ctx.accounts.master_edition))
        .mint(&ctx.accounts.mint.to_account_info())
        .payer(&ctx.accounts.payer)
        .authority(&ctx.accounts.payer)
        .system_program(&ctx.accounts.system_program)
        .sysvar_instructions(&ctx.accounts.sysvar_instruction)
        .spl_token_program(&ctx.accounts.token_program)
        .spl_ata_program(&ctx.accounts.associated_token_program)
        .amount(1)
        .invoke()?;

    Ok(())
}

/// Verifies the NFT as part of the collection
pub fn verify_nft(ctx: &Context<RegisterRider>) -> Result<()> {
    VerifyCollectionV1CpiBuilder::new(&ctx.accounts.metadata_program)
        .collection_mint(&ctx.accounts.collection_mint.to_account_info())
        .authority(&ctx.accounts.payer)
        .metadata(&ctx.accounts.metadata_account)
        .system_program(&ctx.accounts.system_program)
        .invoke()?;

    Ok(())
}

/// Main instruction handler for registering a new rider
/// 1. Creates NFT accounts
/// 2. Mints NFT to rider
/// 3. Verifies NFT as part of collection
/// 4. Initializes rider statistics
pub fn _register_rider(ctx: Context<RegisterRider>) -> Result<()> {
    create_nft_accounts(&ctx)?;
    mint_nft(&ctx)?;
    verify_nft(&ctx)?;

    // Initialize rider statistics
    ctx.accounts.rider_account.set_inner(RiderAccount {
        bump: ctx.bumps.rider_account,
        num_rides: 0,
        avg_rating: 0,
        num_ratings: 0,
    });

    Ok(())
}
