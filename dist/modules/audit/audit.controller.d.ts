import { AuditService } from './audit.service';
import { AuditEntityType } from '../../common/enums';
export declare class AuditController {
    private auditService;
    constructor(auditService: AuditService);
    getEntityHistory(type: AuditEntityType, id: string, page?: number, limit?: number): Promise<{
        logs: (import("./audit-log.schema").AuditLog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserActivity(userId: string, page?: number, limit?: number): Promise<{
        logs: (import("./audit-log.schema").AuditLog & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
