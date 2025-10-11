import { Body, Controller, Get, Post, Put, Req, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto, SendOtpDto, VerifyOtpDto, ChangePasswordDto, UpdateProfileDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService, private jwt: JwtService) {}

  @Post('signup')
  @HttpCode(200)
  async signup(@Body() dto: SignupDto) {
    const res = await this.auth.signup(dto);
    // Ensure user payload is present even if older builds return only token
    if ((res as any).user) return res;
    const payload = this.jwt.decode((res as any).token) as any;
    const user = await this.auth.me(payload?.sub);
    return { ...(res as any), user };
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto) {
    const res = await this.auth.login(dto);
    if ((res as any).user) return res;
    const payload = this.jwt.decode((res as any).token) as any;
    const user = await this.auth.me(payload?.sub);
    return { ...(res as any), user };
  }

  @Post('send-otp')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.auth.sendOtp(dto.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.auth.verifyOtp(dto.email, dto.otp);
  }

  @Get('me')
  me(@Req() req: any) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return this.auth.me(payload?.sub);
  }

  @Put('change-password')
  changePassword(@Req() req: any, @Body() dto: ChangePasswordDto) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return this.auth.changePassword(payload?.sub, dto.currentPassword, dto.newPassword);
  }

  @Put('profile')
  updateProfile(@Req() req: any, @Body() dto: UpdateProfileDto) {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return this.auth.updateProfile(payload?.sub, dto.firstName, dto.lastName);
  }
}



