import { DocumentsService } from './documents.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateDocumentDto } from './dto/document.dto';
import { DocumentType, UserRole } from '../../common/enums';
export declare class DocumentsController {
    private documentsService;
    private cloudinaryService;
    constructor(documentsService: DocumentsService, cloudinaryService: CloudinaryService);
    upload(file: Express.Multer.File, startupId: string, type: DocumentType, description: string, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./document.schema").DocumentFileDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./document.schema").DocumentFile & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    create(dto: CreateDocumentDto, userId: string): Promise<import("mongoose").Document<unknown, {}, import("./document.schema").DocumentFileDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./document.schema").DocumentFile & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
    findByStartup(startupId: string, type?: string): Promise<(import("./document.schema").DocumentFile & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    getExpiring(days?: number): Promise<(import("./document.schema").DocumentFile & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    })[]>;
    verify(id: string, userId: string, userRole: UserRole): Promise<import("mongoose").Document<unknown, {}, import("./document.schema").DocumentFileDocument, {}, import("mongoose").DefaultSchemaOptions> & import("./document.schema").DocumentFile & import("mongoose").Document<import("mongoose").Types.ObjectId, any, any, Record<string, any>, {}> & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    }>;
}
