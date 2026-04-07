import { IsMongoId, IsNumber, IsOptional, IsString, Min, IsEnum } from 'class-validator';
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
}

export class UpdateFundingInterestDto {
  @IsEnum(FundingInterestStatus)
  status: FundingInterestStatus;
}
