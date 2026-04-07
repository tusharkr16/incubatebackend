import { Model, Types } from 'mongoose';
import { Financial, FinancialDocument } from './financial.schema';
import { CreateFinancialDto, UpdateFinancialStatusDto } from './dto/financial.dto';
import { AuditService } from '../audit/audit.service';
import { UserRole } from '../../common/enums';
export declare class FinancialsService {
    private financialModel;
    private auditService;
    constructor(financialModel: Model<FinancialDocument>, auditService: AuditService);
    create(dto: CreateFinancialDto, userId: string): Promise<import("mongoose").Document<unknown, {}, FinancialDocument, {}, import("mongoose").DefaultSchemaOptions> & Financial & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string, page?: number, limit?: number): Promise<{
        records: (Financial & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    updateStatus(id: string, dto: UpdateFinancialStatusDto, userId: string, userRole: UserRole): Promise<(Financial & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getStartupFinancialSummary(startupId: string): Promise<any[]>;
    getFundedStartups(): Promise<any[]>;
}
