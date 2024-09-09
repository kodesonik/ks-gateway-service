import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmChangeDto {
  @ApiProperty()
  @IsString()
  @Length(6, 6)
  otp: string;
}
