import { IsString, IsOptional, IsMongoId, IsIn, IsArray, ValidateNested, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { GrantApplicationStatus } from '../../../common/enums';

export class GrantStepDto {
  @IsString()
  label: string;

  @IsBoolean()
  completed: boolean;
}

export class CreateGrantApplicationDto {
  @IsMongoId()
  startupId: string;

  @IsString()
  grantId: string;

  @IsString()
  grantName: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrantStepDto)
  steps?: GrantStepDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateGrantApplicationDto {
  @IsOptional()
  @IsIn(Object.values(GrantApplicationStatus))
  status?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GrantStepDto)
  steps?: GrantStepDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}
