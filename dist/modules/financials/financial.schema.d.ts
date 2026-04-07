import { Document, Types } from 'mongoose';
import { DisbursementStatus } from '../../common/enums';
export type FinancialDocument = Financial & Document;
export declare class Financial {
    startupId: Types.ObjectId;
    title: string;
    amount: number;
    currency: string;
    disbursementDate: Date;
    status: DisbursementStatus;
    approvedBy: Types.ObjectId;
    approvedAt: Date;
    createdBy: Types.ObjectId;
    notes: string;
    documentId: Types.ObjectId;
    fundSource: string;
}
export declare const FinancialSchema: import("mongoose").Schema<Financial, import("mongoose").Model<Financial, any, any, any, any, any, Financial>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Financial, Document<unknown, {}, Financial, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<string, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    disbursementDate?: import("mongoose").SchemaDefinitionProperty<Date, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<DisbursementStatus, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    approvedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    approvedAt?: import("mongoose").SchemaDefinitionProperty<Date, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    documentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundSource?: import("mongoose").SchemaDefinitionProperty<string, Financial, Document<unknown, {}, Financial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Financial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Financial>;
