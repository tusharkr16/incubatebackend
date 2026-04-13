import { FundingInterestStatus } from '../../../common/enums';
export declare class CreateFundingInterestDto {
    startupId: string;
    amount: number;
    currency?: string;
    message?: string;
    phone?: string;
    contactUrl?: string;
}
export declare class UpdateFundingInterestDto {
    status: FundingInterestStatus;
}
