import { IsString, IsNotEmpty, IsOptional, IsEnum, ValidateNested, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

class ScoresDto {
  @IsNumber() @Min(0) @Max(10) sector: number;
  @IsNumber() @Min(0) @Max(10) stage: number;
  @IsNumber() @Min(0) @Max(10) founderStrength: number;
  @IsNumber() @Min(0) @Max(10) incorporation: number;
  @IsNumber() @Min(0) @Max(10) problemMarket: number;
  @IsNumber() @Min(0) @Max(10) gtm: number;
  @IsNumber() @Min(0) @Max(10) marketValidation: number;
}

export class CreateEvaluationDto {
  @IsString()
  @IsNotEmpty()
  startupId: string;

  @ValidateNested()
  @Type(() => ScoresDto)
  scores: ScoresDto;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(['strongly_recommend', 'recommend', 'neutral', 'not_recommend'])
  recommendation?: string;
}
