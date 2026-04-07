import { DocumentType } from '../../../common/enums';
export declare class CreateDocumentDto {
    startupId: string;
    type: DocumentType;
    filename: string;
    url: string;
    mimeType?: string;
    sizeBytes?: number;
    description?: string;
    expiresAt?: string;
}
