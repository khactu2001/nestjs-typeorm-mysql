import { IsString } from 'class-validator';

export class MessageType {
  @IsString()
  token: string;
}
