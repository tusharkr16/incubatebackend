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
exports.FundingInterestSchema = exports.FundingInterest = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let FundingInterest = class FundingInterest {
    startupId;
    investorId;
    amount;
    currency;
    message;
    status;
};
exports.FundingInterest = FundingInterest;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FundingInterest.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], FundingInterest.prototype, "investorId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, min: 1 }),
    __metadata("design:type", Number)
], FundingInterest.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'INR' }),
    __metadata("design:type", String)
], FundingInterest.prototype, "currency", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 1000 }),
    __metadata("design:type", String)
], FundingInterest.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: enums_1.FundingInterestStatus,
        default: enums_1.FundingInterestStatus.PENDING,
        index: true,
    }),
    __metadata("design:type", String)
], FundingInterest.prototype, "status", void 0);
exports.FundingInterest = FundingInterest = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'funding_interests' })
], FundingInterest);
exports.FundingInterestSchema = mongoose_1.SchemaFactory.createForClass(FundingInterest);
exports.FundingInterestSchema.index({ startupId: 1, investorId: 1 }, { unique: true });
exports.FundingInterestSchema.index({ investorId: 1, createdAt: -1 });
//# sourceMappingURL=funding-interest.schema.js.map