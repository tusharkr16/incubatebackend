import { CohortService } from './cohort.service';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
declare class UploadPosterDto {
    imageData: string;
}
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
        cloudinaryUrl?: string;
        source?: string;
        error?: string;
    }>;
    generatePosterForCohort(id: string, body: GeneratePosterDto): Promise<{
        imageUrl?: string;
        cloudinaryUrl?: string;
        source?: string;
        error?: string;
    }>;
    uploadPoster(id: string, body: UploadPosterDto): Promise<{
        cloudinaryUrl: string;
    }>;
    syncResponses(id: string): Promise<{
        synced: number;
        skipped: number;
        errors: number;
    }>;
    updateStatus(id: string, status: string): Promise<import("./cohort.schema").Cohort & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStartupsByCohort(id: string): Promise<{
        founder: (import("../founders/founder.schema").Founder & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: import("mongoose").Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        name: string;
        sector: {
            primary: string;
            tags: string[];
        };
        stage: import("../../common/enums").StartupStage;
        founderIds: import("mongoose").Types.ObjectId[];
        assignedInvestorIds: import("mongoose").Types.ObjectId[];
        status: import("../../common/enums").StartupStatus;
        createdBy: import("mongoose").Types.ObjectId;
        cohortYear: number;
        cohortId: import("mongoose").Types.ObjectId;
        description: string;
        website: string;
        latestScore: number;
        isFlagged: boolean;
        flagReason: string;
        schemeName: string;
        pitchDeckLink: string;
        incorporationDate: Date;
        cinNumber: string;
        fundingSecured: number;
        fundingScheme: string;
        dateOfRelease: Date;
        _id: import("mongoose").Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "save" | "validate" | "remove" | null;
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: import("mongoose").Collection;
        db: import("mongoose").Connection;
        errors?: import("mongoose").Error.ValidationError;
        isNew: boolean;
        schema: import("mongoose").Schema;
        __v: number;
    }[]>;
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
