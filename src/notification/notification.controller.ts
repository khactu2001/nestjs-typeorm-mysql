import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterFCMTokenDto } from './dto/register-fcm-token.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notiService: NotificationService) {}
  @Post()
  registerFCMToken(@Body() registerBody: RegisterFCMTokenDto) {
    return this.notiService.registerFCMToken(registerBody);
  }

  @Get('/:id')
  pushNotificationWithServer(@Param('id') userId: number) {
    return this.notiService.pushNotification(userId);
  }
}
