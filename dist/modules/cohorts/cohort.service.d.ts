import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Cohort, CohortDocument } from './cohort.schema';
import { StartupDocument } from '../startups/startup.schema';
import { FounderDocument } from '../founders/founder.schema';
import { CreateCohortDto } from './dto/create-cohort.dto';
import { ApplyCohortDto } from './dto/apply-cohort.dto';
export declare class CohortService {
    private cohortModel;
    private startupModel;
    private founderModel;
    private readonly config;
    private readonly logger;
    private openai;
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
    generatePoster(cohort: {
        name: string;
        year: number;
        tagline?: string;
        sectors?: string[];
        description?: string;
    }): Promise<{
        imageUrl?: string;
        source?: string;
        error?: string;
    }>;
}
