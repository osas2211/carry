export type CreateDeliveryArgs = {
  index: number;
  reward: string;
  eta: number;
};

export type AssignDeliveryArgs = {
  index: number;
  courier: String;
};

export type confirmDeliveryArgs = {
  index: number;
};
