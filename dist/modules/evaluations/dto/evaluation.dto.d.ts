declare class ScoresDto {
    sector: number;
    stage: number;
    founderStrength: number;
    incorporation: number;
    problemMarket: number;
    gtm: number;
    marketValidation: number;
}
export declare class CreateEvaluationDto {
    startupId: string;
    scores: ScoresDto;
    notes?: string;
    recommendation?: string;
}
export {};
