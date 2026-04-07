import { Document as MongoDocument, Types } from 'mongoose';
import { DocumentType } from '../../common/enums';
export type DocumentFileDocument = DocumentFile & MongoDocument;
export declare class DocumentFile {
    startupId: Types.ObjectId;
    type: DocumentType;
    filename: string;
    url: string;
    mimeType: string;
    sizeBytes: number;
    uploadedBy: Types.ObjectId;
    isVerified: boolean;
    verifiedBy: Types.ObjectId;
    verifiedAt: Date;
    expiresAt: Date;
    description: string;
}
export declare const DocumentFileSchema: import("mongoose").Schema<DocumentFile, import("mongoose").Model<DocumentFile, any, any, any, any, any, DocumentFile>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<DocumentType, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    filename?: import("mongoose").SchemaDefinitionProperty<string, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    url?: import("mongoose").SchemaDefinitionProperty<string, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    mimeType?: import("mongoose").SchemaDefinitionProperty<string, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sizeBytes?: import("mongoose").SchemaDefinitionProperty<number, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    uploadedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    verifiedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    verifiedAt?: import("mongoose").SchemaDefinitionProperty<Date, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    expiresAt?: import("mongoose").SchemaDefinitionProperty<Date, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, DocumentFile, MongoDocument<unknown, {}, DocumentFile, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<DocumentFile & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, DocumentFile>;
