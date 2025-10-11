import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class OtpService {
  async send(email: string, otp: string): Promise<void> {
    const devMode = process.env.OTP_DEV === 'true' || !process.env.SMTP_HOST;
    if (devMode) {
      // eslint-disable-next-line no-console
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
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('SMTP send failed in dev, returning OTP in logs:', (err as Error).message);
        // eslint-disable-next-line no-console
        console.log(`[DEV OTP] ${email}: ${otp}`);
        return;
      }
      throw err;
    }
  }
}



