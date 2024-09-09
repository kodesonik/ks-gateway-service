import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { msResponseFormatter } from 'src/helpers';
import { CreateDeclarationDto, StartYearDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Declaration')
@Controller('declaration')
export class DeclarationController {
  constructor(
    @Inject('DECLARATION_SERVICE') private readonly client: ClientProxy,
  ) {}

  @ApiOperation({ summary: 'Get all declarations' })
  @ApiResponse({ status: 200, description: 'Get all declarations' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get()
  async getDeclarations() {
    return await msResponseFormatter(this.client.send('get-declarations', {}));
  }

  @ApiOperation({ summary: 'Get declaration by id' })
  @ApiResponse({ status: 200, description: 'Get declaration by id' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get(':id')
  async getDeclaration(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('get_declaration', { id }),
    );
  }

  @ApiOperation({ summary: 'Start declaration year' })
  @ApiResponse({ status: 200, description: 'Start declaration year' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('year')
  async startDeclarationYear(@Body() body: StartYearDto) {
    return await msResponseFormatter(
      this.client.send('start-declaration-year', body),
    );
  }

  @ApiOperation({ summary: 'Get declaration year' })
  @ApiResponse({ status: 200, description: 'Get declaration year' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('year')
  async getDeclarationYear() {
    return await msResponseFormatter(
      this.client.send('get_declaration_year', {}),
    );
  }

  @ApiOperation({ summary: 'Get current declaration year' })
  @ApiResponse({ status: 200, description: 'Get current declaration year' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('year/current')
  async getCurrentDeclarationYear() {
    return await msResponseFormatter(
      this.client.send('get_current_declaration_year', {}),
    );
  }

  @ApiOperation({ summary: 'Get declaration by year' })
  @ApiResponse({ status: 200, description: 'Get declaration by year' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Get('year/:year')
  async getDeclarationByYear(@Param('year') year: string) {
    return await msResponseFormatter(
      this.client.send('get_declaration_by_year', { year }),
    );
  }

  @ApiOperation({ summary: 'End declaration year' })
  @ApiResponse({ status: 200, description: 'End declaration year' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('end-year/:year')
  async endDeclarationYear(@Param('year') year: string) {
    return await msResponseFormatter(
      this.client.send('end_declaration_year', { year }),
    );
  }

  @ApiOperation({ summary: 'Create declaration' })
  @ApiResponse({ status: 200, description: 'Create declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  async createDeclaration(@Body() body: CreateDeclarationDto) {
    return await msResponseFormatter(
      this.client.send('create_declaration', body),
    );
  }

  @ApiOperation({ summary: 'Update declaration' })
  @ApiResponse({ status: 200, description: 'Update declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch(':id')
  async updateDeclaration(@Param('id') id: string, @Body() body: any) {
    return await msResponseFormatter(
      this.client.send('update_declaration', { id, ...body }),
    );
  }

  @ApiOperation({ summary: 'Cancel declaration' })
  @ApiResponse({ status: 200, description: 'Cancel declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('cancel/:id')
  async cancelDeclaration(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('cancel_declaration', { id }),
    );
  }

  @ApiOperation({ summary: 'Confirm payment declaration' })
  @ApiResponse({ status: 200, description: 'Confirm payment declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('confirm-payment')
  async confirmPayment(@Body() body: any) {
    return await msResponseFormatter(
      this.client.send('confirm_payment_declaration', body),
    );
  }

  @ApiOperation({ summary: 'Validate declaration' })
  @ApiResponse({ status: 200, description: 'Validate declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Patch('validate/:id')
  async validateDeclaration(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('validate_declaration', { id }),
    );
  }

  @ApiOperation({ summary: 'Delete declaration' })
  @ApiResponse({ status: 200, description: 'Delete declaration' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Delete(':id')
  async deleteDeclaration(@Param('id') id: string) {
    return await msResponseFormatter(
      this.client.send('delete_declaration', { id }),
    );
  }
}
