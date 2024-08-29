import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class ConfirmAccountDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(8)
  otp: string;
}
