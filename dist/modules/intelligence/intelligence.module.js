"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const intelligence_service_1 = require("./intelligence.service");
const intelligence_controller_1 = require("./intelligence.controller");
const startup_schema_1 = require("../startups/startup.schema");
const evaluation_schema_1 = require("../evaluations/evaluation.schema");
const milestone_schema_1 = require("../milestones/milestone.schema");
const financial_schema_1 = require("../financials/financial.schema");
let IntelligenceModule = class IntelligenceModule {
};
exports.IntelligenceModule = IntelligenceModule;
exports.IntelligenceModule = IntelligenceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: startup_schema_1.Startup.name, schema: startup_schema_1.StartupSchema },
                { name: evaluation_schema_1.Evaluation.name, schema: evaluation_schema_1.EvaluationSchema },
                { name: milestone_schema_1.Milestone.name, schema: milestone_schema_1.MilestoneSchema },
                { name: financial_schema_1.Financial.name, schema: financial_schema_1.FinancialSchema },
            ]),
        ],
        controllers: [intelligence_controller_1.IntelligenceController],
        providers: [intelligence_service_1.IntelligenceService],
        exports: [intelligence_service_1.IntelligenceService],
    })
], IntelligenceModule);
//# sourceMappingURL=intelligence.module.js.map