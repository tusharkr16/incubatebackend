import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { UserRole } from '../../common/enums';

@Controller('milestones')
export class MilestonesController {
  constructor(private milestonesService: MilestonesService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  create(@Body() dto: CreateMilestoneDto, @CurrentUser('_id') userId: string) {
    return this.milestonesService.create(dto, userId);
  }

  @Get('startup/:startupId')
  findByStartup(@Param('startupId') startupId: string) {
    return this.milestonesService.findByStartup(startupId);
  }

  @Get('overdue')
  @Roles(UserRole.ADMIN, UserRole.CEO)
  getOverdue() {
    return this.milestonesService.getOverdueMilestones();
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.CEO, UserRole.FOUNDER)
  update(
    @Param('id') id: string,
    @Body() dto: UpdateMilestoneDto,
    @CurrentUser('_id') userId: string,
  ) {
    return this.milestonesService.update(id, dto, userId);
  }
}
