"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const investment_controller_1 = require("./investment.controller");
const investment_service_1 = require("./investment.service");
const investment_schema_1 = require("./schemas/investment.schema");
const jwt_1 = require("@nestjs/jwt");
const planConfig_schema_1 = require("./schemas/planConfig.schema");
const user_schema_1 = require("../auth/schemas/user.schema");
const notification_module_1 = require("../notification/notification.module");
let InvestmentModule = class InvestmentModule {
};
exports.InvestmentModule = InvestmentModule;
exports.InvestmentModule = InvestmentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret' }),
            mongoose_1.MongooseModule.forFeature([
                { name: investment_schema_1.Investment.name, schema: investment_schema_1.InvestmentSchema },
                { name: planConfig_schema_1.PlanConfig.name, schema: planConfig_schema_1.PlanConfigSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
            ]),
            notification_module_1.NotificationModule,
        ],
        controllers: [investment_controller_1.InvestmentController],
        providers: [investment_service_1.InvestmentService],
    })
], InvestmentModule);
//# sourceMappingURL=investment.module.js.map