import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test1@example.com', type: String })
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}
