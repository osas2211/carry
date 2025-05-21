import { UserProfile } from "./user";

export interface CreateDeliveryJobDto {
  reward: number;
  pickupAddress: string;
  dropoffAddress: string;
  metadataHash?: string;
  description?: string;
  packageType?: string;
  eta: string; // ISO 8601 format
  isFragile?: boolean;
  programId: number;
}

export interface AcceptDeliveryJobDto {
  courierAddress: string;
}

export interface ConfirmDeliveryDto {
  courierAddress: string;
}

export interface UserJobCount {
  count: number;
}

export interface DeliveryJobI {
  id: string;
  creatorAddress: string;
  courierAddress: string | null;
  status: JobStatus;
  reward: number;
  metadataHash: string | null;
  pickupAddress: string;
  dropoffAddress: string;
  description: string | null;
  packageType: string | null;
  isFragile: boolean;
  isTemperatureSensitive: boolean;
  createdAt: string;
  updatedAt: string;
  acceptedAt: string;
  pickedUpAt: string;
  deliveredAt: string;
  eta: string;
  isDeleted: boolean;
  courier?: UserProfile;
  creator?: UserProfile;
  programId: number;
}

export enum JobStatus {
  ACTIVE = "ACTIVE",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  ASSIGNED = "ASSIGNED",
  PICKED_UP = "PICKED_UP",
}
