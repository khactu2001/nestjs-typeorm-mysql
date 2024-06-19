import { Injectable } from '@nestjs/common';
import { SEND_STATUS, SendEmailEntity } from './entities/email.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SendEmailDto } from './dto/send-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(SendEmailEntity)
    private readonly sendEmailRepository: Repository<SendEmailEntity>,
    private readonly mailerService: MailerService,
  ) {}

  sendEmail(sendEmailDto: SendEmailDto) {
    const { toEmail } = sendEmailDto;
    const configService = new ConfigService();
    this.mailerService
      .sendMail({
        to: toEmail, // list of receivers
        from: configService.get('MAILER_USER'), // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome 1</b>', // HTML body content
      })
      .then(() => {
        const emailRecord: Omit<SendEmailEntity, 'id'> = {
          toEmail,
          status: SEND_STATUS.SUCCESS,
          deliveredAt: new Date(),
          fromEmail: 'lktubom@gmail.com',
          subject: 'Testing Nest MailerModule ✔',
          content: '<b>welcome 1</b>',
          createdAt: new Date(),
        };
        const sendEmail = this.sendEmailRepository.create(emailRecord);
        return this.sendEmailRepository.save(sendEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
