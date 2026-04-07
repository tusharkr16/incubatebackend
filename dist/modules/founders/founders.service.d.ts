import { Model, Types } from 'mongoose';
import { Founder, FounderDocument } from './founder.schema';
import { Startup, StartupDocument } from '../startups/startup.schema';
import { CreateFounderDto, CreateMyStartupDto, UpdateFounderDto } from './dto/founder.dto';
import { UpdateStartupDto } from '../startups/dto/startup.dto';
import { AuditService } from '../audit/audit.service';
export declare class FoundersService {
    private founderModel;
    private startupModel;
    private auditService;
    constructor(founderModel: Model<FounderDocument>, startupModel: Model<StartupDocument>, auditService: AuditService);
    create(dto: CreateFounderDto, userId: string): Promise<import("mongoose").Document<unknown, {}, FounderDocument, {}, import("mongoose").DefaultSchemaOptions> & Founder & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findMyStartups(userId: string, userEmail: string): Promise<(Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createMyStartup(dto: CreateMyStartupDto, userId: string, userEmail: string, userName: string): Promise<import("mongoose").Document<unknown, {}, StartupDocument, {}, import("mongoose").DefaultSchemaOptions> & Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string): Promise<(Founder & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findMyStartup(userId: string, userEmail?: string): Promise<(Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateMyStartup(startupId: string, dto: UpdateStartupDto, userId: string, userEmail: string): Promise<Startup & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findById(id: string): Promise<Founder & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateFounderDto, userId: string): Promise<Founder & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
