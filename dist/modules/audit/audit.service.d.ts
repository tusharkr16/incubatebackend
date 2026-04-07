import { Model, Types } from 'mongoose';
import { AuditLog, AuditLogDocument } from './audit-log.schema';
import { AuditAction, AuditEntityType } from '../../common/enums';
export interface CreateAuditLogDto {
    entityType: AuditEntityType;
    entityId: Types.ObjectId;
    action: AuditAction;
    performedBy: Types.ObjectId;
    changes?: Record<string, {
        before: unknown;
        after: unknown;
    }>;
    ipAddress?: string;
    userAgent?: string;
    requestId?: string;
}
export declare class AuditService {
    private auditModel;
    constructor(auditModel: Model<AuditLogDocument>);
    log(data: CreateAuditLogDto): Promise<void>;
    getEntityHistory(entityType: AuditEntityType, entityId: string, page?: number, limit?: number): Promise<{
        logs: (AuditLog & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserActivity(userId: string, page?: number, limit?: number): Promise<{
        logs: (AuditLog & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
