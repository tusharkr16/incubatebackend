import { Model, Types } from 'mongoose';
import { DocumentFile, DocumentFileDocument } from './document.schema';
import { CreateDocumentDto } from './dto/document.dto';
import { AuditService } from '../audit/audit.service';
import { UserRole } from '../../common/enums';
export declare class DocumentsService {
    private documentModel;
    private auditService;
    constructor(documentModel: Model<DocumentFileDocument>, auditService: AuditService);
    create(dto: CreateDocumentDto, userId: string): Promise<import("mongoose").Document<unknown, {}, DocumentFileDocument, {}, import("mongoose").DefaultSchemaOptions> & DocumentFile & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string, type?: string): Promise<(DocumentFile & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    verify(id: string, userId: string, userRole: UserRole): Promise<import("mongoose").Document<unknown, {}, DocumentFileDocument, {}, import("mongoose").DefaultSchemaOptions> & DocumentFile & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    getExpiringDocuments(daysAhead?: number): Promise<(DocumentFile & import("mongoose").Document<Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
}
