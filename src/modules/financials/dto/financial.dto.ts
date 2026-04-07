import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber, Min } from 'class-validator';
import { DisbursementStatus } from '../../../common/enums';

export class CreateFinancialDto {
  @IsString() @IsNotEmpty() startupId: string;
  @IsString() @IsNotEmpty() title: string;
  @IsNumber() @Min(0) amount: number;
  @IsOptional() @IsString() currency?: string;
  @IsDateString() disbursementDate: string;
  @IsOptional() @IsEnum(['government_grant', 'institutional', 'private', 'cohort_fund', 'other']) fundSource?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsString() documentId?: string;
}

export class UpdateFinancialStatusDto {
  @IsEnum(DisbursementStatus) status: DisbursementStatus;
  @IsOptional() @IsString() notes?: string;
}
