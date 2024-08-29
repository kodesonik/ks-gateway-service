import { ApiProperty } from '@nestjs/swagger';

export default class Device {
  @ApiProperty()
  id: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  model?: string;

  @ApiProperty()
  brand?: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  version?: string;

  // @ApiProperty()
  isLoggedIn?: boolean;

  // @ApiProperty()
  isActive: boolean;

  // @ApiProperty()
  accountId: string;
}
