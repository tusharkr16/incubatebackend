import { EvaluationsService } from './evaluations.service';
import { CreateEvaluationDto } from './dto/evaluation.dto';
export declare class EvaluationsController {
    private evaluationsService;
    constructor(evaluationsService: EvaluationsService);
    create(dto: CreateEvaluationDto, reviewerId: string): Promise<import("mongoose").Document<unknown, {}, import("./evaluation.schema").EvaluationDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./evaluation.schema").Evaluation & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getEvaluatedStartups(): Promise<any[]>;
    findByStartup(startupId: string): Promise<(import("./evaluation.schema").Evaluation & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getAggregate(startupId: string): Promise<any>;
}
