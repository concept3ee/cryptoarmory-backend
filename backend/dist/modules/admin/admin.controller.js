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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const jwt_1 = require("@nestjs/jwt");
const dto_1 = require("./dto");
let AdminController = class AdminController {
    constructor(service, jwt) {
        this.service = service;
        this.jwt = jwt;
    }
    adminFromReq(req) {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        const payload = this.jwt.decode(token);
        return payload || {};
    }
    credit(req, body) {
        const admin = this.adminFromReq(req);
        return this.service.creditWallet(admin, body.userId, body.amount);
    }
    assign(req, body) {
        const admin = this.adminFromReq(req);
        return this.service.assignRole(admin, body.userId, body.role);
    }
    setDepositWallet(req, body) {
        const admin = this.adminFromReq(req);
        return this.service.setDepositWallet(admin, body.walletText);
    }
    getDepositWallet() {
        return this.service.getDepositWallet();
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('credit-wallet'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreditWalletDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "credit", null);
__decorate([
    (0, common_1.Post)('assign-role'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.AssignRoleDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "assign", null);
__decorate([
    (0, common_1.Post)('deposit-wallet'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.SetDepositWalletDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "setDepositWallet", null);
__decorate([
    (0, common_1.Get)('deposit-wallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getDepositWallet", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService, jwt_1.JwtService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map