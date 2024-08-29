import { IsString, IsEmail } from 'class-validator';

export class SendMailDto {
  @IsString()
  subject: string;

  @IsEmail()
  to: string;

  @IsString()
  content: string;
}
