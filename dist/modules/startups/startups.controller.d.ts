import { StartupsService } from './startups.service';
import { CreateStartupDto, UpdateStartupDto } from './dto/startup.dto';
import { UserRole, StartupStatus } from '../../common/enums';
export declare class StartupsController {
    private startupsService;
    constructor(startupsService: StartupsService);
    create(dto: CreateStartupDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./startup.schema").StartupDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findAll(user: {
        _id: string;
        role: UserRole;
    }, status?: StartupStatus, stage?: string, cohortYear?: string, sector?: string, search?: string, page?: number, limit?: number): Promise<{
        startups: (import("./startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getLeaderboard(cohortYear?: string): Promise<(import("./startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string, user: {
        _id: string;
        role: UserRole;
    }): Promise<import("./startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateStartupDto, userId: string, userRole: UserRole): Promise<(import("./startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
