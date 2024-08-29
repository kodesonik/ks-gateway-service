import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import {
  I18nMiddleware,
  I18nValidationExceptionFilter,
  I18nValidationPipe,
} from 'nestjs-i18n';
import { LangExceptionFilter } from './filters/lang-exception.filter';
async function bootstrap() {
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.use(I18nMiddleware);
  app.useGlobalPipes(new ValidationPipe(), new I18nValidationPipe());
  app.useGlobalFilters(
    new I18nValidationExceptionFilter(),
    new LangExceptionFilter(),
  );
  const whitelist = process.env.CORS_WHITELIST.split(',');
  app.enableCors({
    origin: whitelist,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1/');
  // Documentation
  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      // users: { [process.env.DOCS_USER]: process.env.DOCS_PASSWORD },
      users: { admin: 'admin' },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME + ' Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Bearer',
    )
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Set Mvc
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Start server

  await app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}
bootstrap();
