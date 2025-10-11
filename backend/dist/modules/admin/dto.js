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
exports.SetDepositWalletDto = exports.AssignRoleDto = exports.CreditWalletDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreditWalletDto {
}
exports.CreditWalletDto = CreditWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '661234abcd...', description: 'Target user id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreditWalletDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Amount to credit' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreditWalletDto.prototype, "amount", void 0);
class AssignRoleDto {
}
exports.AssignRoleDto = AssignRoleDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '661234abcd...', description: 'Target user id' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AssignRoleDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['admin', 'user'] }),
    (0, class_validator_1.IsEnum)(['admin', 'user']),
    __metadata("design:type", String)
], AssignRoleDto.prototype, "role", void 0);
class SetDepositWalletDto {
}
exports.SetDepositWalletDto = SetDepositWalletDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USDT-TRC20: TABC...XYZ', description: 'Wallet/address text to display for deposits' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SetDepositWalletDto.prototype, "walletText", void 0);
//# sourceMappingURL=dto.js.map