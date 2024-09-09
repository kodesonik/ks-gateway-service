import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';
import configuration from './configs/configuration';
import { AuthenticationController } from './controllers/authentication/authentication.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { join } from 'path';
import { UserController } from './controllers/user/user.controller';
// import { UploadModule } from './modules/upload/upload.module';
import { TicketController } from './controllers/ticket/ticket.controller';
import { DeclarationController } from './controllers/declaration/declaration.controller';
import { TransactionController } from './controllers/transaction/transaction.controller';
import { MulterModule } from '@nestjs/platform-express';
// import { UserController } from './controllers/user/user.controller';

const controllers = [
  {
    name: 'AUTHENTICATION_CONTROLLER',
    provide: AuthenticationController,
  },
  {
    name: 'USER_CONTROLLER',
    provide: UserController,
  },
  {
    name: 'TICKET_CONTROLLER',
    provide: TicketController,
  },
  {
    name: 'DECLARATION_CONTROLLER',
    provide: DeclarationController,
  },
  {
    name: 'TRANSACTION_CONTROLLER',
    provide: TransactionController,
  },
]
  .filter((controller) => {
    const controllers = process.env.PROJECT_CONTROLLERS.split(',');
    console.log('controllers', controllers);
    return controllers?.includes(controller.name);
  })
  .map((controller) => controller.provide);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get('i18n.fallbackLanguage'),
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: configService.get('i18n.watch'),
        },
      }),
      resolvers: [
        { use: QueryResolver, options: ['lang', 'language'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang', 'accept-language', 'lang', 'language']),
      ],
      inject: [ConfigService],
    }),
    MulterModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        dest: configService.get('multer.dest'),
      }),
      inject: [ConfigService],
    }),
    // UploadModule,
  ],
  controllers: [AppController, ...controllers],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
    ConfigService,
    {
      provide: 'AUTHENTICATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const tokenServiceOptions = configService.get('authenticationService');
        return ClientProxyFactory.create(tokenServiceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'MESSAGING_SERVICE',
      useFactory: (configService: ConfigService) => {
        const serviceOptions = configService.get('messagingService');
        return ClientProxyFactory.create(serviceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'TRANSACTION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const serviceOptions = configService.get('transactionService');
        return ClientProxyFactory.create(serviceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'DECLARATION_SERVICE',
      useFactory: (configService: ConfigService) => {
        const serviceOptions = configService.get('declarationService');
        return ClientProxyFactory.create(serviceOptions);
      },
      inject: [ConfigService],
    },
    {
      provide: 'TICKET_SERVICE',
      useFactory: (configService: ConfigService) => {
        const serviceOptions = configService.get('ticketService');
        return ClientProxyFactory.create(serviceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
