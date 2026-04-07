import { Model, Types } from 'mongoose';
import { Evaluation, EvaluationDocument } from './evaluation.schema';
import { CreateEvaluationDto } from './dto/evaluation.dto';
import { AuditService } from '../audit/audit.service';
import { StartupsService } from '../startups/startups.service';
export declare class EvaluationsService {
    private evaluationModel;
    private auditService;
    private startupsService;
    constructor(evaluationModel: Model<EvaluationDocument>, auditService: AuditService, startupsService: StartupsService);
    create(dto: CreateEvaluationDto, reviewerId: string): Promise<import("mongoose").Document<unknown, {}, EvaluationDocument, {}, import("mongoose").DefaultSchemaOptions> & Evaluation & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string): Promise<(Evaluation & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getStartupAggregateScore(startupId: string): Promise<any>;
    private computeTotalScore;
    private recalculateStartupScore;
}
