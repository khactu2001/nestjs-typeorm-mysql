import { Type } from 'class-transformer';
import { IsArray, IsEmail } from 'class-validator';

export class SendEmailDto {
  @IsArray()
  toEmails: string[];
}
