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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const investment_service_1 = require("./investment.service");
const jwt_1 = require("@nestjs/jwt");
const dto_1 = require("./dto");
const platform_express_1 = require("@nestjs/platform-express");
let InvestmentController = class InvestmentController {
    constructor(service, jwt) {
        this.service = service;
        this.jwt = jwt;
    }
    userIdFromReq(req) {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        const payload = this.jwt.decode(token);
        return payload?.sub;
    }
    create(req, body) {
        const userId = this.userIdFromReq(req);
        return this.service.create(userId, body.planId, body.amount);
    }
    list(req) {
        const userId = this.userIdFromReq(req);
        return this.service.list(userId);
    }
    approve(id) {
        return this.service.approve(id);
    }
    plans() {
        return this.service.getPlans();
    }
    upsertPlan(dto) {
        return this.service.upsertPlan(dto.planId, dto.rate, dto.percent);
    }
    summary(req) {
        const userId = this.userIdFromReq(req);
        return this.service.computeUserSummary(userId);
    }
    async uploadProof(id, file) {
        const dataUrl = file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : undefined;
        return this.service.attachProof(id, dataUrl);
    }
    addProfit(id, body) {
        return this.service.addManualProfit(id, Number(body.amount || 0));
    }
};
exports.InvestmentController = InvestmentController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, dto_1.CreateInvestmentDto]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "approve", null);
__decorate([
    (0, common_1.Get)('plans'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "plans", null);
__decorate([
    (0, common_1.Post)('plans'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.UpsertPlanConfigDto]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "upsertPlan", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "summary", null);
__decorate([
    (0, common_1.Post)(':id/proof'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], InvestmentController.prototype, "uploadProof", null);
__decorate([
    (0, common_1.Post)(':id/add-profit'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InvestmentController.prototype, "addProfit", null);
exports.InvestmentController = InvestmentController = __decorate([
    (0, swagger_1.ApiTags)('investments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('investments'),
    __metadata("design:paramtypes", [investment_service_1.InvestmentService, jwt_1.JwtService])
], InvestmentController);
//# sourceMappingURL=investment.controller.js.map