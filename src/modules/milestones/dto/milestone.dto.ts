import { IsString, IsNotEmpty, IsOptional, IsEnum, IsDateString, IsNumber, Min, Max, IsBoolean } from 'class-validator';
import { MilestoneStatus } from '../../../common/enums';

export class CreateMilestoneDto {
  @IsString() @IsNotEmpty() startupId: string;
  @IsString() @IsNotEmpty() title: string;
  @IsOptional() @IsString() description?: string;
  @IsDateString() deadline: string;
}

export class UpdateMilestoneDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() description?: string;
  @IsOptional() @IsEnum(MilestoneStatus) status?: MilestoneStatus;
  @IsOptional() @IsDateString() deadline?: string;
  @IsOptional() @IsNumber() @Min(0) @Max(100) progressPercent?: number;
  @IsOptional() @IsBoolean() isDelayed?: boolean;
  @IsOptional() @IsString() delayReason?: string;
}
