import { FoundersService } from './founders.service';
import { CreateFounderDto, CreateMyStartupDto, UpdateFounderDto } from './dto/founder.dto';
import { UpdateStartupDto } from '../startups/dto/startup.dto';
export declare class FoundersController {
    private foundersService;
    constructor(foundersService: FoundersService);
    create(dto: CreateFounderDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./founder.schema").FounderDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyStartups(userId: string, userEmail: string): Promise<(import("../startups/startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    createMyStartup(dto: CreateMyStartupDto, userId: string, userEmail: string, userName: string): Promise<import("mongoose").Document<unknown, {}, import("../startups/startup.schema").StartupDocument, {}, import("mongoose").DefaultSchemaOptions> & import("../startups/startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getMyStartup(userId: string, userEmail: string): Promise<(import("../startups/startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    updateMyStartup(startupId: string, dto: UpdateStartupDto, userId: string, userEmail: string): Promise<import("../startups/startup.schema").Startup & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateMyProfile(founderId: string, dto: UpdateFounderDto, userId: string): Promise<import("./founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findByStartup(startupId: string): Promise<(import("./founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findById(id: string): Promise<import("./founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    update(id: string, dto: UpdateFounderDto, userId: string): Promise<import("./founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
}
