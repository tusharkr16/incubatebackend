import { IsString, IsNotEmpty, IsOptional, IsEmail, IsNumber, IsArray, IsUrl, Min, Max, IsEnum, ValidateNested, IsDateString, IsPhoneNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { SectorInfoDto } from '../../startups/dto/startup.dto';
import { StartupStage } from '../../../common/enums';

export class CreateFounderDto {
  @IsString() @IsNotEmpty() name: string;
  @IsEmail() email: string;
  @IsOptional() @IsArray() @IsString({ each: true }) skills?: string[];
  @IsOptional() @IsNumber() @Min(0) yearsOfExperience?: number;
  @IsOptional() @IsUrl() linkedinUrl?: string;
  @IsOptional() @IsString() bio?: string;
  @IsString() @IsNotEmpty() startupId: string;
  @IsOptional() @IsString() userId?: string;
  @IsOptional() @IsString() educationDegree?: string;
  @IsOptional() @IsString() educationInstitution?: string;
  @IsOptional() @IsNumber() educationYear?: number;
}

export class CreateMyStartupDto {
  // ── Startup Info ──────────────────────────────────────────────
  @IsString() @IsNotEmpty() name: string;
  @IsOptional() @IsString() schemeName?: string;
  @ValidateNested() @Type(() => SectorInfoDto) sector: SectorInfoDto; // industry focus
  @IsEnum(StartupStage) stage: StartupStage;
  @IsNumber() @Min(2000) @Max(2100) cohortYear: number;
  @IsOptional() @IsString() description?: string;

  // ── Founder Details ───────────────────────────────────────────
  @IsString() @IsNotEmpty() founderName: string;
  @IsOptional() @IsString() contact?: string;
  @IsEmail() founderEmail: string;

  // ── Online Presence ───────────────────────────────────────────
  @IsOptional() @IsUrl() website?: string;
  @IsOptional() @IsUrl() pitchDeckLink?: string;

  // ── Incorporation ─────────────────────────────────────────────
  @IsOptional() @IsDateString() incorporationDate?: string;
  @IsOptional() @IsString() cinNumber?: string;

  // ── Funding ───────────────────────────────────────────────────
  @IsOptional() @IsNumber() @Min(0) fundingSecured?: number;
  @IsOptional() @IsString() fundingScheme?: string;
  @IsOptional() @IsDateString() dateOfRelease?: string;
}

export class UpdateFounderDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() contact?: string;
  @IsOptional() @IsArray() @IsString({ each: true }) skills?: string[];
  @IsOptional() @IsNumber() @Min(0) yearsOfExperience?: number;
  @IsOptional() @IsString() bio?: string;
  @IsOptional() @IsUrl() linkedinUrl?: string;
}
