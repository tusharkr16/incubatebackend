"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MilestonesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const milestone_schema_1 = require("./milestone.schema");
const milestones_service_1 = require("./milestones.service");
const milestones_controller_1 = require("./milestones.controller");
const audit_module_1 = require("../audit/audit.module");
let MilestonesModule = class MilestonesModule {
};
exports.MilestonesModule = MilestonesModule;
exports.MilestonesModule = MilestonesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: milestone_schema_1.Milestone.name, schema: milestone_schema_1.MilestoneSchema }]),
            audit_module_1.AuditModule,
        ],
        controllers: [milestones_controller_1.MilestonesController],
        providers: [milestones_service_1.MilestonesService],
        exports: [milestones_service_1.MilestonesService],
    })
], MilestonesModule);
//# sourceMappingURL=milestones.module.js.map