import { IsString, IsOptional, IsBoolean, IsMongoId, IsNumber, IsIn, Min, Max } from 'class-validator';

export class AssignStartupDto {
  @IsMongoId()
  startupId: string;

  @IsMongoId()
  accountManagerId: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateAmReviewDto {
  @IsMongoId()
  startupId: string;

  @IsIn(['insight', 'evaluation', 'recommendation', 'risk', 'general'])
  category: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  rating?: number;

  @IsOptional()
  @IsBoolean()
  visibleToFounder?: boolean;
}
