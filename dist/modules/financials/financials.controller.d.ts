import { FinancialsService } from './financials.service';
import { CreateFinancialDto, UpdateFinancialStatusDto } from './dto/financial.dto';
import { UserRole } from '../../common/enums';
export declare class FinancialsController {
    private financialsService;
    constructor(financialsService: FinancialsService);
    create(dto: CreateFinancialDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./financial.schema").FinancialDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./financial.schema").Financial & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getFundedStartups(): Promise<any[]>;
    findByStartup(startupId: string, page?: number, limit?: number): Promise<{
        records: (import("./financial.schema").Financial & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    getSummary(startupId: string): Promise<any[]>;
    updateStatus(id: string, dto: UpdateFinancialStatusDto, userId: string, userRole: UserRole): Promise<(import("./financial.schema").Financial & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
