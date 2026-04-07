import { Model, Types } from 'mongoose';
import { Startup, StartupDocument } from './startup.schema';
import { CreateStartupDto, UpdateStartupDto } from './dto/startup.dto';
import { AuditService } from '../audit/audit.service';
import { UserRole, StartupStatus } from '../../common/enums';
export declare class StartupsService {
    private startupModel;
    private auditService;
    constructor(startupModel: Model<StartupDocument>, auditService: AuditService);
    create(dto: CreateStartupDto, userId: string): Promise<import("mongoose").Document<unknown, {}, StartupDocument, {}, import("mongoose").DefaultSchemaOptions> & Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(user: {
        _id: string;
        role: UserRole;
    }, filters: {
        status?: StartupStatus;
        stage?: string;
        cohortYear?: number;
        sector?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        startups: (Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string, user: {
        _id: string;
        role: UserRole;
    }): Promise<Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateStartupDto, userId: string, userRole: UserRole): Promise<(Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateScore(startupId: string, score: number): Promise<(import("mongoose").Document<unknown, {}, StartupDocument, {}, import("mongoose").DefaultSchemaOptions> & Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }) | null>;
    getLeaderboard(cohortYear?: number): Promise<(Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    private diffObjects;
}
