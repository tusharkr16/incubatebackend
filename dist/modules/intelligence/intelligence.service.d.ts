import { Model, Types } from 'mongoose';
import { StartupDocument } from '../startups/startup.schema';
import { EvaluationDocument } from '../evaluations/evaluation.schema';
import { MilestoneDocument } from '../milestones/milestone.schema';
import { FinancialDocument } from '../financials/financial.schema';
export declare class IntelligenceService {
    private startupModel;
    private evaluationModel;
    private milestoneModel;
    private financialModel;
    private readonly SCORE_WEIGHTS;
    constructor(startupModel: Model<StartupDocument>, evaluationModel: Model<EvaluationDocument>, milestoneModel: Model<MilestoneDocument>, financialModel: Model<FinancialDocument>);
    calculateStartupScore(startupId: string): Promise<number>;
    generateRecommendations(startupId: string): Promise<string[]>;
    getCohortReport(cohortYear: number): Promise<{
        startup: {
            _id: Types.ObjectId;
            name: string;
            sector: {
                primary: string;
                tags: string[];
            };
            stage: import("../../common/enums").StartupStage;
        };
        score: number;
        recommendations: string[];
        isFlagged: boolean;
    }[]>;
    runRiskScan(): Promise<{
        scanned: number;
        flaggedCount: number;
        flagged: {
            id: string;
            name: string;
            overdueMilestones: number;
        }[];
    }>;
}
