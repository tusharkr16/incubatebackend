import { Document, Types } from 'mongoose';
import { FundingInterestStatus } from '../../common/enums';
export type FundingInterestDocument = FundingInterest & Document;
export declare class FundingInterest {
    startupId: Types.ObjectId;
    investorId: Types.ObjectId;
    amount: number;
    currency: string;
    message: string;
    phone: string;
    contactUrl: string;
    status: FundingInterestStatus;
}
export declare const FundingInterestSchema: import("mongoose").Schema<FundingInterest, import("mongoose").Model<FundingInterest, any, any, any, any, any, FundingInterest>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, FundingInterest, Document<unknown, {}, FundingInterest, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    investorId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    amount?: import("mongoose").SchemaDefinitionProperty<number, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    currency?: import("mongoose").SchemaDefinitionProperty<string, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    message?: import("mongoose").SchemaDefinitionProperty<string, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    phone?: import("mongoose").SchemaDefinitionProperty<string, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contactUrl?: import("mongoose").SchemaDefinitionProperty<string, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<FundingInterestStatus, FundingInterest, Document<unknown, {}, FundingInterest, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<FundingInterest & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, FundingInterest>;
