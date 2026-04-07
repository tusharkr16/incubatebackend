"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohortModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const cohort_schema_1 = require("./cohort.schema");
const startup_schema_1 = require("../startups/startup.schema");
const founder_schema_1 = require("../founders/founder.schema");
const cohort_controller_1 = require("./cohort.controller");
const cohort_service_1 = require("./cohort.service");
let CohortModule = class CohortModule {
};
exports.CohortModule = CohortModule;
exports.CohortModule = CohortModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([
                { name: cohort_schema_1.Cohort.name, schema: cohort_schema_1.CohortSchema },
                { name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema },
                { name: founder_schema_1.Founder.name, schema: founder_schema_1.FounderSchema },
            ]),
        ],
        controllers: [cohort_controller_1.CohortController],
        providers: [cohort_service_1.CohortService],
        exports: [cohort_service_1.CohortService],
    })
], CohortModule);
//# sourceMappingURL=cohort.module.js.map