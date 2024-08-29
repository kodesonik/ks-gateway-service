import { IsString } from 'class-validator';

export class SendOtpDto {
  @IsString()
  to: string;

  @IsString()
  otp: string;
}
