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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_1 = require("@nestjs/jwt");
const dto_1 = require("./dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const withdrawal_schema_1 = require("./withdrawal.schema");
let TransactionsController = class TransactionsController {
    constructor(jwt, model) {
        this.jwt = jwt;
        this.model = model;
    }
    withdraw(req, body) {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        const payload = this.jwt.decode(token);
        return this.model.create({
            userId: payload?.sub,
            amount: body.amount,
            accountNumber: body.accountNumber,
            bankName: body.bankName,
            recipientName: body.recipientName,
            walletAddress: body.walletAddress,
            status: 'received',
        });
    }
    list(req) {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        const payload = this.jwt.decode(token);
        return this.model.find({ userId: payload?.sub }).sort({ createdAt: -1 }).lean();
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)('withdraw'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.WithdrawDto]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "withdraw", null);
__decorate([
    (0, common_1.Get)('withdrawals'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], TransactionsController.prototype, "list", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, swagger_1.ApiTags)('transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('transactions'),
    __param(1, (0, mongoose_1.InjectModel)(withdrawal_schema_1.Withdrawal.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService, mongoose_2.Model])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map