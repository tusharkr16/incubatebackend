import { Controller, Post, Get, Patch, Body, Param } from '@nestjs/common';
import { GrantsService } from './grants.service';
import { CreateGrantApplicationDto, UpdateGrantApplicationDto } from './dto/grants.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../common/enums';

@Controller('grants')
export class GrantsController {
  constructor(private service: GrantsService) {}

  /** Founder/admin registers interest in a grant */
  @Post()
  @Roles(UserRole.FOUNDER, UserRole.ADMIN, UserRole.CEO)
  create(@Body() dto: CreateGrantApplicationDto) {
    return this.service.create(dto);
  }

  /** All applications for a startup */
  @Get('startup/:startupId')
  @Roles(UserRole.FOUNDER, UserRole.ADMIN, UserRole.CEO, UserRole.ACCOUNT_MANAGER)
  getByStartup(@Param('startupId') startupId: string) {
    return this.service.getByStartup(startupId);
  }

  /** Single application detail */
  @Get(':id')
  @Roles(UserRole.FOUNDER, UserRole.ADMIN, UserRole.CEO, UserRole.ACCOUNT_MANAGER)
  getById(@Param('id') id: string) {
    return this.service.getById(id);
  }

  /** Update status / steps / notes */
  @Patch(':id')
  @Roles(UserRole.FOUNDER, UserRole.ADMIN, UserRole.CEO, UserRole.ACCOUNT_MANAGER)
  update(@Param('id') id: string, @Body() dto: UpdateGrantApplicationDto) {
    return this.service.update(id, dto);
  }

  /** All applications (admin/ceo) */
  @Get()
  @Roles(UserRole.ADMIN, UserRole.CEO)
  getAll() {
    return this.service.getAllApplications();
  }
}
