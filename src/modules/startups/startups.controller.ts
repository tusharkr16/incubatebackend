import { Controller, Get, Post, Patch, Body, Param, Query } from '@nestjs/common';
import { StartupsService } from './startups.service';
import { CreateStartupDto, UpdateStartupDto } from './dto/startup.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole, StartupStatus } from '../../common/enums';

@Controller('startups')
export class StartupsController {
  constructor(private startupsService: StartupsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  create(@Body() dto: CreateStartupDto, @CurrentUser('_id') userId: string) {
    return this.startupsService.create(dto, userId);
  }

  @Get()
  findAll(
    @CurrentUser() user: { _id: string; role: UserRole },
    @Query('status') status?: StartupStatus,
    @Query('stage') stage?: string,
    @Query('cohortYear') cohortYear?: string,
    @Query('sector') sector?: string,
    @Query('search') search?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.startupsService.findAll(user, {
      status,
      stage,
      cohortYear: cohortYear ? +cohortYear : undefined,
      sector,
      search,
      page: +page,
      limit: +limit,
    });
  }

  @Get('leaderboard')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.INVESTOR)
  getLeaderboard(@Query('cohortYear') cohortYear?: string) {
    return this.startupsService.getLeaderboard(cohortYear ? +cohortYear : undefined);
  }

  @Get(':id')
  findById(@Param('id') id: string, @CurrentUser() user: { _id: string; role: UserRole }) {
    return this.startupsService.findById(id, user);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStartupDto,
    @CurrentUser('_id') userId: string,
    @CurrentUser('role') userRole: UserRole,
  ) {
    return this.startupsService.update(id, dto, userId, userRole);
  }
}
