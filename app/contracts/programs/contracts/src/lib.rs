use anchor_lang::prelude::*;

declare_id!("9TYPgvadsErCiq1PiZ3Us9fY52eLFVhTHnZ9gZUNiEVT");

const ANCHOR_DISCRIMINATOR: usize = 8;

#[program]
pub mod contracts {
    use anchor_lang::solana_program::{self};

    use super::*;

    // CREATE DELIVERY
    pub fn create_delivery(
        ctx: Context<CreateDeliveryJob>,
        index: u64,
        reward: u64,
        eta: u64,
    ) -> Result<()> {
        let clock = Clock::get()?;
        // Now you can use:
        let creator = &ctx.accounts.creator;
        let escrow = &ctx.accounts.escrow;
        let current_unix_timestamp = clock.unix_timestamp;
        let delivery = &mut ctx.accounts.delivery;
        delivery.index = index;
        delivery.creator = *creator.key;
        delivery.reward = reward;
        delivery.estimated_time_of_arrival = eta;
        delivery.status = String::from(DeliveryStatus::Active.as_str());
        delivery.created_at = current_unix_timestamp as u64;
        // delivery.escrow = *escrow.key;

        let transfer_instruction =
            solana_program::system_instruction::transfer(creator.key, escrow.key, reward);
        solana_program::program::invoke(
            &transfer_instruction,
            &[creator.to_account_info(), escrow.clone()],
        )?;

        Ok(())
    }

    // CONFIRM DELIVERY
    pub fn confirm_delivery(ctx: Context<ConfirmDeliveryStatus>, _index: u64) -> Result<()> {
        let delivery = &mut ctx.accounts.delivery;
        let courier = delivery.courier.ok_or(CustomError::NoCourierAssigned)?;

        require!(
            delivery.status == String::from(DeliveryStatus::InProgress.as_str()),
            CustomError::JobNotAcceptedYet
        );

        require_keys_eq!(
            courier,
            ctx.accounts.courier_account.key(),
            CustomError::InvalidCourierAccount
        );

        let amount = **ctx.accounts.escrow.lamports.borrow();
        **ctx.accounts.escrow.lamports.borrow_mut() = 0;
        **ctx.accounts.courier_account.lamports.borrow_mut() += amount;

        delivery.status = String::from(DeliveryStatus::Delivered.as_str());
        Ok(())
    }

    // ACCEPT DELIVERY JOB
    pub fn accept_delivery_job(
        ctx: Context<CourierDeliveryAcceptJob>,
        _index: u64,
        creator: Pubkey,
    ) -> Result<()> {
        let delivery = &mut ctx.accounts.delivery;

        require!(delivery.status == "ACTIVE", CustomError::JobNotAvailable);
        require_keys_neq!(
            creator,
            *ctx.accounts.courier.key,
            CustomError::CreatorAcceptJobBlocked
        );
        delivery.courier = Some(*ctx.accounts.courier.key);
        delivery.status = String::from(DeliveryStatus::InProgress.as_str());
        Ok(())
    }
}

// ************************************************************** PDAs **************************************************************

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct CreateDeliveryJob<'info> {
    #[account(
        init,
        seeds = [creator.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
        space = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        payer = creator
    )]
    pub delivery: Account<'info, Delivery>,
    #[account(mut)]
    pub creator: Signer<'info>,

    /// CHECK: This account holds Token only, no state manipulation
    #[account(
        mut,
        seeds = [b"escrow", creator.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
    )]
    pub escrow: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(index: u64)]
pub struct ConfirmDeliveryStatus<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        mut,
        seeds = [signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump,
        realloc = ANCHOR_DISCRIMINATOR + Delivery::INIT_SPACE,
        realloc::payer = signer,
        realloc::zero = true
    )]
    pub delivery: Account<'info, Delivery>,

    /// CHECK: Verification will be made manually
    #[account(
        mut,
        seeds= [b"escrow", signer.key().as_ref(), index.to_le_bytes().as_ref()],
        bump
    )]
    pub escrow: AccountInfo<'info>,

    /// CHECK: This account will be checked manually
    pub courier_account: AccountInfo<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(index: u64, creator: Pubkey)]
pub struct CourierDeliveryAcceptJob<'info> {
    #[account(mut)]
    pub courier: Signer<'info>,
    #[account(
        mut,
        seeds = [creator.as_ref(), index.to_le_bytes().as_ref()],
        bump,
    )]
    pub delivery: Account<'info, Delivery>,
    pub system_program: Program<'info, System>,
}

// ************************************************************** PDAs STRUCTS **************************************************************

#[account]
#[derive(InitSpace)]
pub struct Delivery {
    creator: Pubkey,
    courier: Option<Pubkey>,
    #[max_len(50)]
    status: String,
    reward: u64,
    index: u64,
    #[max_len(1000)]
    metadata_hash: Option<String>,
    created_at: u64,
    estimated_time_of_arrival: u64,
    // escrow: Pubkey,
}

// ************************************************************** NORMAL ENUMS **************************************************************

pub enum DeliveryStatus {
    Active,
    InProgress,
    Delivered,
}

impl DeliveryStatus {
    pub fn as_str(&self) -> &'static str {
        match self {
            DeliveryStatus::Active => "ACTIVE",
            DeliveryStatus::InProgress => "IN_PROGRESS",
            DeliveryStatus::Delivered => "DELIVERED",
        }
    }
}

// ************************************************************** ERRORS **************************************************************
#[error_code]
pub enum CustomError {
    #[msg("This Delivery Job is no longer available")]
    JobNotAvailable,

    #[msg("This Delivery Job has not been accepted by a courier yet")]
    JobNotAcceptedYet,

    #[msg("Creator can't be courier")]
    CreatorAcceptJobBlocked,

    #[msg("No courier has been assigned.")]
    NoCourierAssigned,

    #[msg("The provided courier account does not match the assigned courier.")]
    InvalidCourierAccount,
}
