import { Controller, Post, Get, Body, Param, Query, Request } from '@nestjs/common';
import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { UserRole } from '../../common/enums';

class GeneratePosterDto {
  name: string;
  year: number;
  tagline?: string;
  sectors?: string[];
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

  @Post(':id/sync-responses')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  syncResponses(@Param('id') id: string) {
    return this.cohortService.syncFormResponses(id);
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
