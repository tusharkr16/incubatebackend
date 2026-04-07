import { IntelligenceService } from './intelligence.service';
export declare class IntelligenceController {
    private intelligenceService;
    constructor(intelligenceService: IntelligenceService);
    getScore(id: string): Promise<number>;
    getRecommendations(id: string): Promise<string[]>;
    getCohortReport(year: string): Promise<{
        startup: {
            _id: import("mongoose").Types.ObjectId;
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
