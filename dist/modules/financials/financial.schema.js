"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialSchema = exports.Financial = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let Financial = class Financial {
    startupId;
    title;
    amount;
    currency;
    disbursementDate;
    status;
    approvedBy;
    approvedAt;
    createdBy;
    notes;
    documentId;
    fundSource;
};
exports.Financial = Financial;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Financial.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Financial.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 0 }),
    __metadata("design:type", Number)
], Financial.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String, default: 'INR' }),
    __metadata("design:type", String)
], Financial.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Date, index: true }),
    __metadata("design:type", Date)
], Financial.prototype, "disbursementDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.DisbursementStatus, default: enums_1.DisbursementStatus.PENDING, index: true }),
    __metadata("design:type", String)
], Financial.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Financial.prototype, "approvedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Financial.prototype, "approvedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Financial.prototype, "createdBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 500 }),
    __metadata("design:type", String)
], Financial.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Document' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Financial.prototype, "documentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['government_grant', 'institutional', 'private', 'cohort_fund', 'other'] }),
    __metadata("design:type", String)
], Financial.prototype, "fundSource", void 0);
exports.Financial = Financial = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'financials' })
], Financial);
exports.FinancialSchema = mongoose_1.SchemaFactory.createForClass(Financial);
exports.FinancialSchema.index({ startupId: 1, status: 1 });
exports.FinancialSchema.index({ disbursementDate: -1 });
exports.FinancialSchema.index({ startupId: 1, disbursementDate: -1 });
exports.FinancialSchema.index({ createdBy: 1 });
//# sourceMappingURL=financial.schema.js.map