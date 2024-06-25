import { IsInt, IsString, isInt } from 'class-validator';

export class RegisterFCMTokenDto {
  @IsInt()
  userId: number;

  @IsString()
  fcmToken: string;
}
