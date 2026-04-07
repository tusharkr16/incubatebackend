import { Model, Types } from 'mongoose';
import { Milestone, MilestoneDocument } from './milestone.schema';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
import { AuditService } from '../audit/audit.service';
export declare class MilestonesService {
    private milestoneModel;
    private auditService;
    constructor(milestoneModel: Model<MilestoneDocument>, auditService: AuditService);
    create(dto: CreateMilestoneDto, userId: string): Promise<import("mongoose").Document<unknown, {}, MilestoneDocument, {}, import("mongoose").DefaultSchemaOptions> & Milestone & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string): Promise<(Milestone & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateMilestoneDto, userId: string): Promise<(Milestone & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    getOverdueMilestones(): Promise<(Milestone & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
