import { Document, Types } from 'mongoose';
export type EvaluationDocument = Evaluation & Document;
declare class EvaluationScores {
    sector: number;
    stage: number;
    founderStrength: number;
    incorporation: number;
    problemMarket: number;
    gtm: number;
    marketValidation: number;
}
export declare class Evaluation {
    startupId: Types.ObjectId;
    reviewerId: Types.ObjectId;
    scores: EvaluationScores;
    totalScore: number;
    notes: string;
    recommendation: string;
    version: number;
}
export declare const EvaluationSchema: import("mongoose").Schema<Evaluation, import("mongoose").Model<Evaluation, any, any, any, any, any, Evaluation>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Evaluation, Document<unknown, {}, Evaluation, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    reviewerId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    scores?: import("mongoose").SchemaDefinitionProperty<EvaluationScores, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    totalScore?: import("mongoose").SchemaDefinitionProperty<number, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    notes?: import("mongoose").SchemaDefinitionProperty<string, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    recommendation?: import("mongoose").SchemaDefinitionProperty<string, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    version?: import("mongoose").SchemaDefinitionProperty<number, Evaluation, Document<unknown, {}, Evaluation, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Evaluation & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Evaluation>;
export {};
