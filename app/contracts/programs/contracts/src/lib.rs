use anchor_lang::prelude::*;

declare_id!("ECZB1mHo8zaNqhAeZAYBBpnbrBz9pdqp1pFPfpVPzbkX");

#[program]
pub mod contracts {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
