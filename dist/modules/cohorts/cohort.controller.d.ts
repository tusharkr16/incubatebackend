import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
declare class GeneratePosterDto {
    name: string;
    year: number;
    tagline?: string;
    sectors?: string[];
    description?: string;
}
export declare class CohortController {
    private readonly cohortService;
    constructor(cohortService: CohortService);
    create(dto: CreateCohortDto, req: any): Promise<import("./cohort.schema").CohortDocument>;
    findAll(year?: string): Promise<(import("./cohort.schema").Cohort & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    generatePoster(body: GeneratePosterDto): Promise<{
        imageUrl?: string;
        source?: string;
        error?: string;
    }>;
    syncResponses(id: string): Promise<{
        synced: number;
        skipped: number;
        errors: number;
    }>;
    findOne(id: string): Promise<import("./cohort.schema").Cohort & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    apply(id: string, dto: ApplyCohortDto): Promise<{
        message: string;
        startupId: import("mongoose").Types.ObjectId;
        cohortName: string;
        cohortYear: number;
    }>;
}
export {};
