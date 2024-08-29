// import { Public } from './decorators/public.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Test Endpoint')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Test Endpoint')
  @ApiOkResponse({ description: 'Success!' })
  @ApiNotFoundResponse({ description: 'Not found!' })
  // @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
