import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SendEmailEntity } from './entities/email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([SendEmailEntity])],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
