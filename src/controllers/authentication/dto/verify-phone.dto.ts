import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class VerifyPhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
