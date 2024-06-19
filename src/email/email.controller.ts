import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailDto } from './dto/send-email.dto';
import { EmailService } from './email.service';

@Controller('send-email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  @Post()
  sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return this.emailService.sendEmail(sendEmailDto);
  }
}
