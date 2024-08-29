import { IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class SendSmsDto {
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;
}
