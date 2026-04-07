"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const core_1 = require("@nestjs/core");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const startups_module_1 = require("./modules/startups/startups.module");
const founders_module_1 = require("./modules/founders/founders.module");
const evaluations_module_1 = require("./modules/evaluations/evaluations.module");
const milestones_module_1 = require("./modules/milestones/milestones.module");
const financials_module_1 = require("./modules/financials/financials.module");
const documents_module_1 = require("./modules/documents/documents.module");
const audit_module_1 = require("./modules/audit/audit.module");
const intelligence_module_1 = require("./modules/intelligence/intelligence.module");
const cohort_module_1 = require("./modules/cohorts/cohort.module");
const funding_interests_module_1 = require("./modules/funding-interests/funding-interests.module");
const app_controller_1 = require("./app.controller");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    uri: config.get('MONGODB_URI', 'mongodb://localhost:27017/incubatex'),
                    maxPoolSize: 10,
                    serverSelectionTimeoutMS: 5000,
                }),
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            startups_module_1.StartupsModule,
            founders_module_1.FoundersModule,
            evaluations_module_1.EvaluationsModule,
            milestones_module_1.MilestonesModule,
            financials_module_1.FinancialsModule,
            documents_module_1.DocumentsModule,
            audit_module_1.AuditModule,
            intelligence_module_1.IntelligenceModule,
            cohort_module_1.CohortModule,
            funding_interests_module_1.FundingInterestsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
            { provide: core_1.APP_GUARD, useClass: roles_guard_1.RolesGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map