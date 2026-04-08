import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Cohort, CohortDocument, CohortStatus } from './cohort.schema';
import { StartupDocument } from '../startups/startup.schema';
import { Founder, FounderDocument } from '../founders/founder.schema';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
import { StartupStatus } from '../../common/enums';
export declare class CohortService {
    private cohortModel;
    private startupModel;
    private founderModel;
    private readonly config;
    private readonly logger;
    private openai;
    private anthropic;
    constructor(cohortModel: Model<CohortDocument>, startupModel: Model<StartupDocument>, founderModel: Model<FounderDocument>, config: ConfigService);
    private getFormsClient;
    create(dto: CreateCohortDto, userId: string): Promise<CohortDocument>;
    findAll(year?: number): Promise<(Cohort & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<Cohort & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    updateStatus(id: string, status: CohortStatus): Promise<Cohort & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    getStartupsByCohort(cohortId: string): Promise<{
        founder: (Founder & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        }) | null;
        name: string;
        sector: {
            primary: string;
            tags: string[];
        };
        stage: import("../../common/enums").StartupStage;
        founderIds: Types.ObjectId[];
        assignedInvestorIds: Types.ObjectId[];
        status: StartupStatus;
        createdBy: Types.ObjectId;
        cohortYear: number;
        cohortId: Types.ObjectId;
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
        _id: Types.ObjectId;
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
    createGoogleForm(cohort: {
        name: string;
        year: number;
        description?: string;
        sectors?: string[];
    }): Promise<{
        formId: string;
        formUrl: string;
        questionIds: Record<string, string>;
    } | null>;
    syncFormResponses(cohortId: string): Promise<{
        synced: number;
        skipped: number;
        errors: number;
    }>;
    applyToCohort(cohortId: string, dto: ApplyCohortDto): Promise<{
        message: string;
        startupId: Types.ObjectId;
        cohortName: string;
        cohortYear: number;
    }>;
    private buildPosterPromptWithClaude;
    private buildBasicPrompt;
    generatePoster(cohort: {
        name: string;
        year: number;
        tagline?: string;
        sectors?: string[];
        description?: string;
    }, cohortId?: string): Promise<{
        imageUrl?: string;
        cloudinaryUrl?: string;
        source?: string;
        error?: string;
    }>;
    uploadPosterFromBase64(cohortId: string, imageData: string): Promise<{
        cloudinaryUrl: string;
    }>;
}
