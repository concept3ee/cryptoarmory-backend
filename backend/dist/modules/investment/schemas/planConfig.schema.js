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
exports.PlanConfigSchema = exports.PlanConfig = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PlanConfig = class PlanConfig {
};
exports.PlanConfig = PlanConfig;
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['starter', 'premium', 'elite'], unique: true }),
    __metadata("design:type", String)
], PlanConfig.prototype, "planId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: ['daily', 'weekly', 'monthly'] }),
    __metadata("design:type", String)
], PlanConfig.prototype, "rate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], PlanConfig.prototype, "percent", void 0);
exports.PlanConfig = PlanConfig = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], PlanConfig);
exports.PlanConfigSchema = mongoose_1.SchemaFactory.createForClass(PlanConfig);
//# sourceMappingURL=planConfig.schema.js.map