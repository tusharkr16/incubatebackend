import { MilestoneStatus } from '../../../common/enums';
export declare class CreateMilestoneDto {
    startupId: string;
    title: string;
    description?: string;
    deadline: string;
}
export declare class UpdateMilestoneDto {
    title?: string;
    description?: string;
    status?: MilestoneStatus;
    deadline?: string;
    progressPercent?: number;
    isDelayed?: boolean;
    delayReason?: string;
}
