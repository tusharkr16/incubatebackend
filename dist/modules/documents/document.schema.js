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
exports.DocumentFileSchema = exports.DocumentFile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const enums_1 = require("../../common/enums");
let DocumentFile = class DocumentFile {
    startupId;
    type;
    filename;
    url;
    mimeType;
    sizeBytes;
    uploadedBy;
    isVerified;
    verifiedBy;
    verifiedAt;
    expiresAt;
    description;
};
exports.DocumentFile = DocumentFile;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Startup', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DocumentFile.prototype, "startupId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: enums_1.DocumentType, index: true }),
    __metadata("design:type", String)
], DocumentFile.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, trim: true }),
    __metadata("design:type", String)
], DocumentFile.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], DocumentFile.prototype, "url", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], DocumentFile.prototype, "mimeType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DocumentFile.prototype, "sizeBytes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DocumentFile.prototype, "uploadedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], DocumentFile.prototype, "isVerified", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], DocumentFile.prototype, "verifiedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], DocumentFile.prototype, "verifiedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], DocumentFile.prototype, "expiresAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, maxlength: 500 }),
    __metadata("design:type", String)
], DocumentFile.prototype, "description", void 0);
exports.DocumentFile = DocumentFile = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, collection: 'documents' })
], DocumentFile);
exports.DocumentFileSchema = mongoose_1.SchemaFactory.createForClass(DocumentFile);
exports.DocumentFileSchema.index({ startupId: 1, type: 1 });
exports.DocumentFileSchema.index({ uploadedBy: 1 });
exports.DocumentFileSchema.index({ expiresAt: 1 }, { sparse: true });
//# sourceMappingURL=document.schema.js.map