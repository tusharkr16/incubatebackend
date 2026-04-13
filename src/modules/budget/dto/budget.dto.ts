import {
  IsString, IsNumber, IsOptional, IsEnum, Min, Max, IsInt, MaxLength,
} from 'class-validator';

export class UpsertBudgetEntryDto {
  @IsEnum(['recurring', 'training', 'administrative', 'travel', 'capax'])
  category: string;

  @IsInt()
  @Min(0)
  @Max(3)
  year: number;

  @IsString()
  @MaxLength(300)
  description: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  budgetAmount?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  spentAmount?: number;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  comment?: string;
}

export class UploadInvoiceDto {
  /** Base64 data URL, e.g. "data:application/pdf;base64,..." */
  @IsString()
  base64: string;

  @IsString()
  @MaxLength(255)
  fileName: string;
}
