import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator';

export class CreateDeliveryJobDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  reward: number;

  @IsNotEmpty()
  @IsString()
  pickupAddress: string;

  @IsNotEmpty()
  @IsString()
  dropoffAddress: string;

  @IsOptional()
  @IsString()
  metadataHash?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  packageType?: string;

  @IsNotEmpty()
  @IsDateString()
  eta: string; // ISO 8601 format

  @IsNotEmpty()
  @IsNumber()
  programId: number;
}

export class AcceptDeliveryJobDto {
  courierAddress: string;
}

export class ConfirmDeliveryDto {
  courierAddress: string;
}
