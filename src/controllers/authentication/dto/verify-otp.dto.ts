import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Device } from 'src/types';

export class VerifyOtpDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  otp: string;

  @ApiProperty()
  device: Device;
}
