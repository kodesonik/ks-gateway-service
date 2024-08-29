import { Controller, Headers, Get, Param } from '@nestjs/common';
import { StreamChat } from 'stream-chat';

@Controller('stream')
export class StreamController {
  constructor() {}

  @Get('token/:username')
  getToken(@Headers() headers, @Param('username') username: string) {
    const user = headers.user;
    const serverClient = StreamChat.getInstance(
      '5ugx8yuzw4yp',
      '6tv5udmgezvf87n4r2jkt4bh8r4rgxgp7rkgg2ecn3gvwrzdsba59z7yxq54bcde',
    );
    const token = serverClient.createToken(
      user?.username || username || 'john',
    );
    return { token };
  }
}
