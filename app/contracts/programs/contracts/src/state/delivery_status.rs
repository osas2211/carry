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
