import { Document, Types } from 'mongoose';
export type FounderDocument = Founder & Document;
export declare class Founder {
    name: string;
    email: string;
    skills: string[];
    yearsOfExperience: number;
    linkedinUrl: string;
    bio: string;
    startupId: Types.ObjectId;
    contact: string;
    userId: Types.ObjectId;
    educationDegree: string;
    educationInstitution: string;
    educationYear: number;
}
export declare const FounderSchema: import("mongoose").Schema<Founder, import("mongoose").Model<Founder, any, any, any, any, any, Founder>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Founder, Document<unknown, {}, Founder, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    email?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    skills?: import("mongoose").SchemaDefinitionProperty<string[], Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    yearsOfExperience?: import("mongoose").SchemaDefinitionProperty<number, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    linkedinUrl?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    bio?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    startupId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    contact?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    educationDegree?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    educationInstitution?: import("mongoose").SchemaDefinitionProperty<string, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    educationYear?: import("mongoose").SchemaDefinitionProperty<number, Founder, Document<unknown, {}, Founder, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Founder & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Founder>;
