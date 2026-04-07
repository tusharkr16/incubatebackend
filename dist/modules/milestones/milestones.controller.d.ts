import { MilestonesService } from './milestones.service';
import { CreateMilestoneDto, UpdateMilestoneDto } from './dto/milestone.dto';
export declare class MilestonesController {
    private milestonesService;
    constructor(milestonesService: MilestonesService);
    create(dto: CreateMilestoneDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./milestone.schema").MilestoneDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./milestone.schema").Milestone & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string): Promise<(import("./milestone.schema").Milestone & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getOverdue(): Promise<(import("./milestone.schema").Milestone & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    update(id: string, dto: UpdateMilestoneDto, userId: string): Promise<(import("./milestone.schema").Milestone & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
