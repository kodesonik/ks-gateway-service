import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeUsernameDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  username: string;
}
