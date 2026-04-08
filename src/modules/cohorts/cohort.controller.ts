import { Controller, Post, Get, Patch, Body, Param, Query, Request } from '@nestjs/common';
import { IsString, IsNumber, IsOptional, IsArray, IsBase64 } from 'class-validator';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { UserRole } from '../../common/enums';

class UploadPosterDto {
  @IsString()
  imageData: string; // base64 data-URL from canvas
}

class GeneratePosterDto {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @IsOptional() @IsString()
  tagline?: string;

  @IsOptional() @IsArray() @IsString({ each: true })
  sectors?: string[];

  @IsOptional() @IsString()
  description?: string;
}

@Controller('cohorts')
export class CohortController {
  constructor(private readonly cohortService: CohortService) {}

  // ── Protected (CEO / Admin) ───────────────────────────────────────────────

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  create(@Body() dto: CreateCohortDto, @Request() req: any) {
    return this.cohortService.create(dto, req.user._id.toString());
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  findAll(@Query('year') year?: string) {
    return this.cohortService.findAll(year ? +year : undefined);
  }

  @Post('generate-poster')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  generatePoster(@Body() body: GeneratePosterDto) {
    return this.cohortService.generatePoster(body);
  }

  @Post(':id/generate-poster')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  generatePosterForCohort(@Param('id') id: string, @Body() body: GeneratePosterDto) {
    return this.cohortService.generatePoster(body, id);
  }

  @Post(':id/upload-poster')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  uploadPoster(@Param('id') id: string, @Body() body: UploadPosterDto) {
    return this.cohortService.uploadPosterFromBase64(id, body.imageData);
  }

  @Post(':id/sync-responses')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  syncResponses(@Param('id') id: string) {
    return this.cohortService.syncFormResponses(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.cohortService.updateStatus(id, status as any);
  }

  @Get(':id/startups')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  getStartupsByCohort(@Param('id') id: string) {
    return this.cohortService.getStartupsByCohort(id);
  }

  // ── Public (no auth — for the shareable application form) ─────────────────

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.cohortService.findOne(id);
  }

  @Post(':id/apply')
  @Public()
  apply(@Param('id') id: string, @Body() dto: ApplyCohortDto) {
    return this.cohortService.applyToCohort(id, dto);
  }
}
