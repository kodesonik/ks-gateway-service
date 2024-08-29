import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { CompleteProfileDto } from './complete-profile.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends CompleteProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
