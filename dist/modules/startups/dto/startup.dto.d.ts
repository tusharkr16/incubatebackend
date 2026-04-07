import { StartupStage, StartupStatus } from '../../../common/enums';
export declare class SectorInfoDto {
    primary: string;
    tags?: string[];
}
export declare class CreateStartupDto {
    name: string;
    sector: SectorInfoDto;
    stage: StartupStage;
    cohortYear: number;
    description?: string;
    website?: string;
    assignedInvestorIds?: string[];
    schemeName?: string;
    pitchDeckLink?: string;
    incorporationDate?: string;
    cinNumber?: string;
    fundingSecured?: number;
    fundingScheme?: string;
    dateOfRelease?: string;
}
export declare class UpdateStartupDto {
    name?: string;
    sector?: SectorInfoDto;
    stage?: StartupStage;
    status?: StartupStatus;
    description?: string;
    website?: string;
    assignedInvestorIds?: string[];
    isFlagged?: boolean;
    flagReason?: string;
    schemeName?: string;
    pitchDeckLink?: string;
    incorporationDate?: string;
    cinNumber?: string;
    fundingSecured?: number;
    fundingScheme?: string;
    dateOfRelease?: string;
}
