// import { Public } from './decorators/public.decorator';
import {
  Body,
  Controller,
  Get,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './pipes';
import { Public } from './decorators';

@ApiTags('General')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test endpoint' })
  @ApiOkResponse({ description: 'Success!' })
  @ApiNotFoundResponse({ description: 'Not found!' })
  // @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @ApiOperation({ summary: 'Upload File' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: { type: 'string', format: 'binary' },
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  uploadFile(
    @Body() body: any,
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    return { message: 'File uploaded successfully', files };
  }
}
