import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export enum ApplyStage {
  IDEATION = 'ideation',
  VALIDATION = 'validation',
  EARLY_TRACTION = 'early_traction',
  GROWTH = 'growth',
}

export class ApplyCohortDto {
  // ── Company ──────────────────────────────────────────────────────────────
  @IsString()
  companyName: string;

  @IsString()
  sector: string;

  @IsOptional()
  @IsEnum(ApplyStage)
  stage?: ApplyStage;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  website?: string;

  // ── Founder ───────────────────────────────────────────────────────────────
  @IsString()
  founderName: string;

  @IsEmail()
  founderEmail: string;

  @IsOptional()
  @IsString()
  founderLinkedin?: string;

  @IsOptional()
  @IsString()
  founderBio?: string;

  @IsOptional()
  @IsString()
  founderSkills?: string;
}
