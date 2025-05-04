import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator'

export class CreateDeliveryJobDto {
  @IsNotEmpty()
  @IsString()
  creatorAddress: string

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  reward: number

  @IsNotEmpty()
  @IsString()
  pickupAddress: string

  @IsNotEmpty()
  @IsString()
  dropoffAddress: string

  @IsOptional()
  @IsString()
  metadataHash?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsNotEmpty()
  @IsDateString()
  eta: string // ISO 8601 format
}


export class AcceptDeliveryJobDto {
  courierAddress: string
}

export class ConfirmDeliveryDto {
  courierAddress: string
}