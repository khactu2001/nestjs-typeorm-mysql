import { Type } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsEmail()
  toEmail: string;
}
