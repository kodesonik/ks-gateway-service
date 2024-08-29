import { ApiProperty } from '@nestjs/swagger';
import { Account } from '../models';

export class AuthResponse {
  @ApiProperty({ type: Account })
  account?: Account;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token?: string;

  @ApiProperty()
  status: number;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  timestamp: string;
}
