import { CohortStatus } from '../cohort.schema';
export declare class CreateCohortDto {
    name: string;
    year: number;
    description?: string;
    tagline?: string;
    sectors?: string[];
    applicationDeadline?: string;
    maxStartups?: number;
    googleFormUrl?: string;
    status?: CohortStatus;
}
