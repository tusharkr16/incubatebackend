import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuditService } from './audit.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole, AuditEntityType } from '../../common/enums';

@Controller('audit')
@Roles(UserRole.ADMIN, UserRole.CEO) // Only admins and CEOs can view audit logs
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get('entity/:type/:id')
  getEntityHistory(
    @Param('type') type: AuditEntityType,
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.auditService.getEntityHistory(type, id, +page, +limit);
  }

  @Get('user/:userId')
  getUserActivity(
    @Param('userId') userId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 20,
  ) {
    return this.auditService.getUserActivity(userId, +page, +limit);
  }
}
