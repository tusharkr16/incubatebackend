import { Document, Types } from 'mongoose';
import { MilestoneStatus } from '../../common/enums';
export type MilestoneDocument = Milestone & Document;
export declare class Milestone {
    startupId: Types.ObjectId;
    title: string;
    description: string;
    status: MilestoneStatus;
    deadline: Date;
    progressPercent: number;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    isDelayed: boolean;
    delayReason: string;
    completedAt: Date;
}
export declare const MilestoneSchema: import("mongoose").Schema<Milestone, import("mongoose").Model<Milestone, any, any, any, any, any, Milestone>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Milestone, Document<unknown, {}, Milestone, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<MilestoneStatus, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    deadline?: import("mongoose").SchemaDefinitionProperty<Date, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    progressPercent?: import("mongoose").SchemaDefinitionProperty<number, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    updatedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isDelayed?: import("mongoose").SchemaDefinitionProperty<boolean, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    delayReason?: import("mongoose").SchemaDefinitionProperty<string, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    completedAt?: import("mongoose").SchemaDefinitionProperty<Date, Milestone, Document<unknown, {}, Milestone, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Milestone & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Milestone>;
