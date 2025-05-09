use anchor_lang::prelude::*;

#[error_code]
pub enum CustomError {
    #[msg("This Delivery Job is no longer available")]
    JobNotAvailable,

    #[msg("This Delivery Job has not been accepted by a courier yet")]
    JobNotAcceptedYet,

    #[msg("Creator can't be courier")]
    JobBlocked,

    #[msg("No courier has been assigned.")]
    NoCourierAssigned,

    #[msg("The provided courier account does not match the assigned courier.")]
    InvalidCourierAccount,

    #[msg("No URI found for this rating")]
    NoMatchingUri,

    #[msg("NFT Ownership required to accept jobs ")]
    NftOwnershipRequired,

    #[msg("NFT is not part of the verified collection.")]
    CollectionNotVerified,

    #[msg("You can only give one review per delivery")]
    RiderAlreadyReviewed,
}
