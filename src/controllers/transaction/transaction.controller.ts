import { Controller, Get } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  constructor() {}

  @Get()
  findEvents() {
    return { transactions: 100 };
  }
}
