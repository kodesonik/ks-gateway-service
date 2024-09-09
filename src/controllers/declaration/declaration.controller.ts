import { Controller, Get } from '@nestjs/common';

@Controller('declaration')
export class DeclarationController {
  constructor() {}

  @Get()
  getTickets() {
    return { tickets: 100 };
  }
}
