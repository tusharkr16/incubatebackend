import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsDateString,
  IsEnum,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CohortStatus } from '../cohort.schema';

export class CreateCohortDto {
  @IsString()
  name: string;

  @IsNumber()
  @Min(2000)
  @Max(2100)
  @Type(() => Number)
  year: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  sectors?: string[];

  @IsOptional()
  @IsDateString()
  applicationDeadline?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  maxStartups?: number;

  @IsOptional()
  @IsString()
  googleFormUrl?: string;

  @IsOptional()
  @IsEnum(CohortStatus)
  status?: CohortStatus;
}
