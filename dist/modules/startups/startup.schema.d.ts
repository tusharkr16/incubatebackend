import { Document, Types } from 'mongoose';
import { StartupStage, StartupStatus } from '../../common/enums';
export type StartupDocument = Startup & Document;
declare class SectorInfo {
    primary: string;
    tags: string[];
}
export declare class Startup {
    name: string;
    sector: SectorInfo;
    stage: StartupStage;
    founderIds: Types.ObjectId[];
    assignedInvestorIds: Types.ObjectId[];
    status: StartupStatus;
    createdBy: Types.ObjectId;
    cohortYear: number;
    description: string;
    website: string;
    latestScore: number;
    isFlagged: boolean;
    flagReason: string;
    schemeName: string;
    pitchDeckLink: string;
    incorporationDate: Date;
    cinNumber: string;
    fundingSecured: number;
    fundingScheme: string;
    dateOfRelease: Date;
}
export declare const StartupSchema: import("mongoose").Schema<Startup, import("mongoose").Model<Startup, any, any, any, any, any, Startup>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Startup, Document<unknown, {}, Startup, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    sector?: import("mongoose").SchemaDefinitionProperty<SectorInfo, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    stage?: import("mongoose").SchemaDefinitionProperty<StartupStage, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    founderIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    assignedInvestorIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<StartupStatus, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cohortYear?: import("mongoose").SchemaDefinitionProperty<number, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    website?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    latestScore?: import("mongoose").SchemaDefinitionProperty<number, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    isFlagged?: import("mongoose").SchemaDefinitionProperty<boolean, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    flagReason?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    schemeName?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    pitchDeckLink?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    incorporationDate?: import("mongoose").SchemaDefinitionProperty<Date, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    cinNumber?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundingSecured?: import("mongoose").SchemaDefinitionProperty<number, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    fundingScheme?: import("mongoose").SchemaDefinitionProperty<string, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    dateOfRelease?: import("mongoose").SchemaDefinitionProperty<Date, Startup, Document<unknown, {}, Startup, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Startup & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Startup>;
export {};
