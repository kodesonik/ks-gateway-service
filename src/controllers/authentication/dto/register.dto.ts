import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { CompleteProfileDto } from './complete-profile.dto';

export class RegisterDto extends CompleteProfileDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
