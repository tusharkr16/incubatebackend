import { IsMongoId, IsNumber, IsOptional, IsString, Min, IsEnum, IsUrl } from 'class-validator';
import { FundingInterestStatus } from '../../../common/enums';

export class CreateFundingInterestDto {
  @IsMongoId()
  startupId: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsUrl({}, { message: 'contactUrl must be a valid URL' })
  contactUrl?: string;
}

export class UpdateFundingInterestDto {
  @IsEnum(FundingInterestStatus)
  status: FundingInterestStatus;
}
