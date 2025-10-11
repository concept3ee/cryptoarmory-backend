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
exports.UpsertPlanConfigDto = exports.CreateInvestmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInvestmentDto {
}
exports.CreateInvestmentDto = CreateInvestmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'basic', description: 'Identifier of the investment plan' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInvestmentDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Amount to invest' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateInvestmentDto.prototype, "amount", void 0);
class UpsertPlanConfigDto {
}
exports.UpsertPlanConfigDto = UpsertPlanConfigDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['starter', 'premium', 'elite'] }),
    (0, class_validator_1.IsEnum)(['starter', 'premium', 'elite']),
    __metadata("design:type", String)
], UpsertPlanConfigDto.prototype, "planId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['daily', 'weekly', 'monthly'] }),
    (0, class_validator_1.IsEnum)(['daily', 'weekly', 'monthly']),
    __metadata("design:type", String)
], UpsertPlanConfigDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.5, description: 'Percent profit per period' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpsertPlanConfigDto.prototype, "percent", void 0);
//# sourceMappingURL=dto.js.map