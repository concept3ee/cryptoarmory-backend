import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { JwtService } from '@nestjs/jwt';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService, private jwt: JwtService) {}

  private userIdFromReq(req: any): string {
    const auth = req.headers.authorization || '';
    const token = auth.replace('Bearer ', '');
    const payload = this.jwt.decode(token) as any;
    return payload?.sub;
  }

  @Get()
  list(@Req() req: any) {
    const userId = this.userIdFromReq(req);
    return this.service.list(userId);
  }

  @Get('unread-count')
  unread(@Req() req: any) {
    const userId = this.userIdFromReq(req);
    return this.service.unreadCount(userId);
  }

  @Post(':id/read')
  markRead(@Req() req: any, @Param('id') id: string) {
    const userId = this.userIdFromReq(req);
    return this.service.markRead(userId, id);
  }

  @Post('read-all')
  readAll(@Req() req: any) {
    const userId = this.userIdFromReq(req);
    return this.service.markAllRead(userId);
  }
}




