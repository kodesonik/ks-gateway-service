import { ApiProperty } from '@nestjs/swagger';
import { AuthMethod, Gender } from '../enums';

export default class Account {
  @ApiProperty()
  id: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  phone: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  avatar: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  birthdate: Date;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  address: string;

  @ApiProperty()
  defaultUsername: boolean;

  @ApiProperty()
  authMethods: AuthMethod[];

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  lastLogin: Date;
}
