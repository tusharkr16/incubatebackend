import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { AuditLog, AuditLogDocument } from './audit-log.schema';
import { AuditAction, AuditEntityType } from '../../common/enums';

export interface CreateAuditLogDto {
  entityType: AuditEntityType;
  entityId: Types.ObjectId;
  action: AuditAction;
  performedBy: Types.ObjectId;
  changes?: Record<string, { before: unknown; after: unknown }>;
  ipAddress?: string;
  userAgent?: string;
  requestId?: string;
}

@Injectable()
export class AuditService {
  constructor(
    @InjectModel(AuditLog.name) private auditModel: Model<AuditLogDocument>,
  ) {}

  async log(data: CreateAuditLogDto): Promise<void> {
    // Fire-and-forget — audit logging should never block the main request
    this.auditModel.create({ ...data, timestamp: new Date() }).catch((err) =>
      console.error('[AuditService] Failed to log:', err.message),
    );
  }

  async getEntityHistory(
    entityType: AuditEntityType,
    entityId: string,
    page = 1,
    limit = 20,
  ) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      this.auditModel
        .find({ entityType, entityId: new Types.ObjectId(entityId) })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .populate('performedBy', 'name email role')
        .lean(),
      this.auditModel.countDocuments({ entityType, entityId: new Types.ObjectId(entityId) }),
    ]);

    return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async getUserActivity(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [logs, total] = await Promise.all([
      this.auditModel
        .find({ performedBy: new Types.ObjectId(userId) })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      this.auditModel.countDocuments({ performedBy: new Types.ObjectId(userId) }),
    ]);

    return { logs, total, page, limit, totalPages: Math.ceil(total / limit) };
  }
}
