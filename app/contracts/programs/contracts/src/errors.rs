use anchor_lang::prelude::*;

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
