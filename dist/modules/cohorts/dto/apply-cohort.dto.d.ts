export declare enum ApplyStage {
    IDEATION = "ideation",
    VALIDATION = "validation",
    EARLY_TRACTION = "early_traction",
    GROWTH = "growth"
}
export declare class ApplyCohortDto {
    companyName: string;
    sector: string;
    stage?: ApplyStage;
    description?: string;
    website?: string;
    founderName: string;
    founderEmail: string;
    founderLinkedin?: string;
    founderBio?: string;
    founderSkills?: string;
}
