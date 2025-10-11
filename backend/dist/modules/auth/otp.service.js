"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let OtpService = class OtpService {
    async send(email, otp) {
        const devMode = process.env.OTP_DEV === 'true' || !process.env.SMTP_HOST;
        if (devMode) {
            console.log(`[DEV OTP] ${email}: ${otp}`);
            return;
        }
        try {
            const port = Number(process.env.SMTP_PORT || 587);
            const secure = process.env.SMTP_SECURE === 'true' || port === 465;
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port,
                secure,
                auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
            });
            await transporter.sendMail({
                from: process.env.SMTP_FROM || 'no-reply@cryptoarmory.local',
                to: email,
                subject: 'Your CryptoArmory verification code',
                text: `Your verification code is ${otp}`,
            });
        }
        catch (err) {
            if (process.env.NODE_ENV !== 'production') {
                console.warn('SMTP send failed in dev, returning OTP in logs:', err.message);
                console.log(`[DEV OTP] ${email}: ${otp}`);
                return;
            }
            throw err;
        }
    }
};
exports.OtpService = OtpService;
exports.OtpService = OtpService = __decorate([
    (0, common_1.Injectable)()
], OtpService);
//# sourceMappingURL=otp.service.js.map