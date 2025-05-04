export interface CreateDeliveryJobDto {
  creatorAddress: string
  reward: number
  pickupAddress: string
  dropoffAddress: string
  metadataHash?: string
  description?: string
  packageType?: string
  eta: string // ISO 8601 format
}

export interface AcceptDeliveryJobDto {
  courierAddress: string
}

export interface ConfirmDeliveryDto {
  courierAddress: string
}

export interface DeliveryJob {
  id: string
  creatorAddress: string
  courierAddress: string | null
  status: JobStatus
  reward: bigint
  metadataHash: string | null
  pickupAddress: string
  dropoffAddress: string
  description: string | null
  packageType: string | null
  isFragile: boolean
  isTemperatureSensitive: boolean
  createdAt: Date
  updatedAt: Date
  eta: string
  isDeleted: boolean
}

export enum JobStatus {
  ACTIVE,
  IN_PROGRESS,
  DELIVERED,
  CANCELLED,
}
