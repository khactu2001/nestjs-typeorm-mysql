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
    private readonly configService: ConfigService,
  ) {}

  sendEmail(sendEmailDto: SendEmailDto) {
    const { toEmails } = sendEmailDto;
    const emailRecord: Omit<SendEmailEntity, 'id' | 'toEmail' | 'status'> = {
      deliveredAt: new Date(),
      fromEmail: 'lktubom@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      content: '<b>welcome 1</b>',
      createdAt: new Date(),
    };

    try {
      for (const email of toEmails) {
        this.mailerService
          .sendMail({
            ...emailRecord,
            to: email,
            from: this.configService.get('MAILER_USER'),
            template: './inform',
            context: {
              name: email,
              url: 'https://docs.nestjs.com',
            },
          })
          .then(() => {
            const record = this.sendEmailRepository.create({
              ...emailRecord,
              status: SEND_STATUS.SUCCESS,
              toEmail: email,
            });
            this.sendEmailRepository.save(record);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

/**
 * toEmail: [string, string]
 * send successfully: insert into sent-email
 */
