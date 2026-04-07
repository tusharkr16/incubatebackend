import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsArray,
  IsNumber,
  IsUrl,
  IsBoolean,
  ValidateNested,
  ArrayMaxSize,
  Min,
  Max,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { StartupStage, StartupStatus } from '../../../common/enums';

export class SectorInfoDto {
  @IsString()
  @IsNotEmpty()
  primary: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

export class CreateStartupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @Type(() => SectorInfoDto)
  sector: SectorInfoDto;

  @IsEnum(StartupStage)
  stage: StartupStage;

  @IsNumber()
  @Min(2000)
  @Max(2100)
  cohortYear: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  assignedInvestorIds?: string[];

  @IsOptional()
  @IsString()
  schemeName?: string;

  @IsOptional()
  @IsUrl()
  pitchDeckLink?: string;

  @IsOptional()
  @IsDateString()
  incorporationDate?: string;

  @IsOptional()
  @IsString()
  cinNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fundingSecured?: number;

  @IsOptional()
  @IsString()
  fundingScheme?: string;

  @IsOptional()
  @IsDateString()
  dateOfRelease?: string;
}

export class UpdateStartupDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => SectorInfoDto)
  sector?: SectorInfoDto;

  @IsOptional()
  @IsEnum(StartupStage)
  stage?: StartupStage;

  @IsOptional()
  @IsEnum(StartupStatus)
  status?: StartupStatus;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  assignedInvestorIds?: string[];

  @IsOptional()
  @IsBoolean()
  isFlagged?: boolean;

  @IsOptional()
  @IsString()
  flagReason?: string;

  @IsOptional()
  @IsString()
  schemeName?: string;

  @IsOptional()
  @IsUrl()
  pitchDeckLink?: string;

  @IsOptional()
  @IsDateString()
  incorporationDate?: string;

  @IsOptional()
  @IsString()
  cinNumber?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  fundingSecured?: number;

  @IsOptional()
  @IsString()
  fundingScheme?: string;

  @IsOptional()
  @IsDateString()
  dateOfRelease?: string;
}
