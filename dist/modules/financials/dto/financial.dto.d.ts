import { DisbursementStatus } from '../../../common/enums';
export declare class CreateFinancialDto {
    startupId: string;
    title: string;
    amount: number;
    currency?: string;
    disbursementDate: string;
    fundSource?: string;
    notes?: string;
    documentId?: string;
}
export declare class UpdateFinancialStatusDto {
    status: DisbursementStatus;
    notes?: string;
}
