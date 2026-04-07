import { SectorInfoDto } from '../../startups/dto/startup.dto';
import { StartupStage } from '../../../common/enums';
export declare class CreateFounderDto {
    name: string;
    email: string;
    skills?: string[];
    yearsOfExperience?: number;
    linkedinUrl?: string;
    bio?: string;
    startupId: string;
    userId?: string;
    educationDegree?: string;
    educationInstitution?: string;
    educationYear?: number;
}
export declare class CreateMyStartupDto {
    name: string;
    schemeName?: string;
    sector: SectorInfoDto;
    stage: StartupStage;
    cohortYear: number;
    description?: string;
    founderName: string;
    contact?: string;
    founderEmail: string;
    website?: string;
    pitchDeckLink?: string;
    incorporationDate?: string;
    cinNumber?: string;
    fundingSecured?: number;
    fundingScheme?: string;
    dateOfRelease?: string;
}
export declare class UpdateFounderDto {
    name?: string;
    email?: string;
    contact?: string;
    skills?: string[];
    yearsOfExperience?: number;
    bio?: string;
    linkedinUrl?: string;
}
