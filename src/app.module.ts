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
// import { UserController } from './controllers/user/user.controller';

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
  ],
  controllers: [AppController, AuthenticationController, UserController],
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
    // {
    //   provide: 'FILE_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const fileServiceOptions = configService.get('fileService');
    //     return ClientProxyFactory.create(fileServiceOptions);
    //   },
    //   inject: [ConfigService],
    // },
    // {
    //   provide: 'DECLARATION_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const accountServiceOptions = configService.get('declarationService');
    //     return ClientProxyFactory.create(accountServiceOptions);
    //   },
    //   inject: [ConfigService],
    // },
    // {
    //   provide: 'TRANSACTION_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const accountServiceOptions = configService.get('transactionService');
    //     return ClientProxyFactory.create(accountServiceOptions);
    //   },
    //   inject: [ConfigService],
    // },
  ],
})
export class AppModule {}
