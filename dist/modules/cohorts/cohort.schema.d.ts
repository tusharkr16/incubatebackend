import { Document, Types } from 'mongoose';
export type CohortDocument = Cohort & Document;
export declare enum CohortStatus {
    DRAFT = "draft",
    OPEN = "open",
    CLOSED = "closed"
}
export declare class Cohort {
    name: string;
    year: number;
    description: string;
    tagline: string;
    sectors: string[];
    applicationDeadline: Date;
    maxStartups: number;
    googleFormUrl: string;
    googleFormId: string;
    googleFormQuestionIds: Map<string, string>;
    syncedResponseIds: string[];
    status: CohortStatus;
    createdBy: Types.ObjectId;
}
export declare const CohortSchema: import("mongoose").Schema<Cohort, import("mongoose").Model<Cohort, any, any, any, any, any, Cohort>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cohort, Document<unknown, {}, Cohort, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    year?: import("mongoose").SchemaDefinitionProperty<number, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    tagline?: import("mongoose").SchemaDefinitionProperty<string, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sectors?: import("mongoose").SchemaDefinitionProperty<string[], Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    applicationDeadline?: import("mongoose").SchemaDefinitionProperty<Date, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    maxStartups?: import("mongoose").SchemaDefinitionProperty<number, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleFormUrl?: import("mongoose").SchemaDefinitionProperty<string, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleFormId?: import("mongoose").SchemaDefinitionProperty<string, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    googleFormQuestionIds?: import("mongoose").SchemaDefinitionProperty<Map<string, string>, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    syncedResponseIds?: import("mongoose").SchemaDefinitionProperty<string[], Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<CohortStatus, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Cohort, Document<unknown, {}, Cohort, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Cohort & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Cohort>;
