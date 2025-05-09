use crate::constants::*;
use crate::state::config::*;
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    metadata::Metadata,
    token::{Mint, Token, TokenAccount},
};
use mpl_token_metadata::{
    accounts::{MasterEdition, Metadata as MetadataAccount},
    instructions::{CreateV1CpiBuilder, MintV1CpiBuilder},
    types::{CollectionDetails, PrintSupply, TokenStandard},
};

/// Account structure for initializing the configuration and collection
#[derive(Accounts)]
pub struct InitializeConfig<'info> {
    // The authority who can initialize the config
    #[account(mut)]
    pub authority: Signer<'info>,

    // The configuration account to be initialized
    #[account(init, payer = authority, space = 8 + Config::INIT_SPACE)]
    pub config: Account<'info, Config>,

    // The mint account for the collection NFT
    #[account(
        init,
        payer = authority,
        mint::decimals = 0,
        mint::authority = authority,
        mint::token_program = token_program,
    )]
    pub collection_mint: Account<'info, Mint>,

    // Associated token account for the collection NFT
    #[account(
        init,
        payer = authority,
        associated_token::mint = collection_mint,
        associated_token::authority = authority,
        associated_token::token_program = token_program,
    )]
    pub token_account: Account<'info, TokenAccount>,

    // Master edition account for the collection NFT
    #[account(
        mut,
        address = MasterEdition::find_pda(&collection_mint.key()).0,
    )]
    pub master_edition: UncheckedAccount<'info>,

    // Metadata account for the collection NFT
    #[account(
        mut,
        address = MetadataAccount::find_pda(&collection_mint.key()).0,
    )]
    pub metadata_account: UncheckedAccount<'info>,

    // Required program accounts
    pub metadata_program: Program<'info, Metadata>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    /// CHECK: Instruction sysvar not used directly
    pub sysvar_instruction: UncheckedAccount<'info>,
}

/// Initialize the configuration with URI ranges and create collection NFT
pub fn _initialize_config(ctx: Context<InitializeConfig>, ranges: Vec<RangeUri>) -> Result<()> {
    // Create and mint the collection NFT
    create_collection(&ctx)?;
    mint_collection(&ctx)?;

    // Initialize config state
    let config = &mut ctx.accounts.config;
    config.authority = *ctx.accounts.authority.key;
    config.ranges = ranges;
    config.collection_mint = ctx.accounts.collection_mint.key();

    Ok(())
}

/// Creates the collection NFT with metadata
fn create_collection(ctx: &Context<InitializeConfig>) -> Result<()> {
    CreateV1CpiBuilder::new(&ctx.accounts.metadata_program)
        .metadata(&ctx.accounts.metadata_account)
        .mint(&ctx.accounts.collection_mint.to_account_info(), true)
        .authority(&ctx.accounts.authority)
        .payer(&ctx.accounts.authority)
        .update_authority(&ctx.accounts.authority, true)
        .master_edition(Some(&ctx.accounts.master_edition))
        .system_program(&ctx.accounts.system_program)
        .sysvar_instructions(&ctx.accounts.sysvar_instruction.to_account_info())
        .spl_token_program(Some(&ctx.accounts.token_program))
        .token_standard(TokenStandard::NonFungible)
        .seller_fee_basis_points(0)
        .name(TITLE.to_string())
        .symbol(SYMBOL.to_string())
        .uri(COLLECTION_URI.to_string())
        .print_supply(PrintSupply::Zero)
        .collection_details(CollectionDetails::V1 { size: 0 })
        .invoke()?;
    Ok(())
}

/// Mints the collection NFT to the authority's token account
fn mint_collection(ctx: &Context<InitializeConfig>) -> Result<()> {
    MintV1CpiBuilder::new(&ctx.accounts.metadata_program)
        .token(&ctx.accounts.token_account.to_account_info())
        .token_owner(Some(&ctx.accounts.authority))
        .metadata(&ctx.accounts.metadata_account)
        .master_edition(Some(&ctx.accounts.master_edition))
        .mint(&ctx.accounts.collection_mint.to_account_info())
        .payer(&ctx.accounts.authority)
        .authority(&ctx.accounts.authority)
        .system_program(&ctx.accounts.system_program)
        .sysvar_instructions(&ctx.accounts.sysvar_instruction)
        .spl_token_program(&ctx.accounts.token_program)
        .spl_ata_program(&ctx.accounts.associated_token_program)
        .amount(1)
        .invoke()?;

    Ok(())
}
