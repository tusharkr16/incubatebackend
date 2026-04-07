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
exports.FounderSchema = exports.Founder = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Founder = class Founder {
    name;
    email;
    skills;
    yearsOfExperience;
    linkedinUrl;
    bio;
    startupId;
    contact;
    userId;
    educationDegree;
    educationInstitution;
    educationYear;
};
exports.Founder = Founder;
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], Founder.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Founder.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Founder.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], Founder.prototype, "yearsOfExperience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Founder.prototype, "linkedinUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Founder.prototype, "bio", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Founder.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Founder.prototype, "contact", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', sparse: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Founder.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Founder.prototype, "educationDegree", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Founder.prototype, "educationInstitution", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Founder.prototype, "educationYear", void 0);
exports.Founder = Founder = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'founders' })
], Founder);
exports.FounderSchema = mongoose_1.SchemaFactory.createForClass(Founder);
exports.FounderSchema.index({ startupId: 1 });
exports.FounderSchema.index({ email: 1 });
//# sourceMappingURL=founder.schema.js.map