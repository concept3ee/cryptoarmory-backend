import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InvestmentService } from './investment.service';
import { JwtService } from '@nestjs/jwt';
import { CreateInvestmentDto, UpsertPlanConfigDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('investments')
@ApiBearerAuth()
@Controller('investments')
export class InvestmentController {
  constructor(private readonly service: InvestmentService, private jwt: JwtService) {}

  private userIdFromReq(req: any): string {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return payload?.sub;
  }

  @Post()
  create(@Req() req: any, @Body() body: CreateInvestmentDto) {
    const userId = this.userIdFromReq(req);
    return this.service.create(userId, body.planId, body.amount);
  }

  @Get()
  list(@Req() req: any) {
    const userId = this.userIdFromReq(req);
    return this.service.list(userId);
  }

  @Post(':id/approve')
  approve(@Param('id') id: string) {
    return this.service.approve(id);
  }

  @Get('plans')
  plans() {
    return this.service.getPlans();
  }

  @Post('plans')
  upsertPlan(@Body() dto: UpsertPlanConfigDto) {
    return this.service.upsertPlan(dto.planId, dto.rate, dto.percent);
  }

  @Get('summary')
  summary(@Req() req: any) {
    const userId = this.userIdFromReq(req);
    return this.service.computeUserSummary(userId);
  }

  @Post(':id/proof')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProof(@Param('id') id: string, @UploadedFile() file?: any) {
    // In a real app, upload to S3; here we store a base64 data URL
    const dataUrl = file ? `data:${file.mimetype};base64,${file.buffer.toString('base64')}` : undefined;
    return this.service.attachProof(id, dataUrl);
  }

  @Post(':id/add-profit')
  addProfit(@Param('id') id: string, @Body() body: { amount: number }) {
    return this.service.addManualProfit(id, Number(body.amount || 0));
  }
}


