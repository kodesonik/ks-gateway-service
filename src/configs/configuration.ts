import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4001,
  services: process.env.PROJECT_EXTERNAL_SERVICES.split(','),
  controllers: process.env.PROJECT_CONTROLLERS.split(','),
  i18n: {
    fallbackLanguage: process.env.FALLBACK_LANGUAGE,
    watch: process.env.I18N_WATCH === 'true',
    // languages: process.env.LANGUAGES.split(','),
  },
  multer: {
    dest: process.env.MULTER_DEST,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  authenticationService: {
    options: {
      host: process.env.AUTHENTICATION_SERVICE_HOST,
      port: process.env.AUTHENTICATION_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  messagingService: {
    options: {
      host: process.env.MESSAGING_SERVICE_HOST,
      port: process.env.MESSAGING_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  transactionService: {
    options: {
      host: process.env.TRANSACTION_SERVICE_HOST,
      port: process.env.TRANSACTION_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  declarationService: {
    options: {
      host: process.env.DECLARATION_SERVICE_HOST,
      port: process.env.DECLARATION_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  ticketService: {
    options: {
      host: process.env.TICKET_SERVICE_HOST,
      port: process.env.TICKET_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
  bucketService: {
    options: {
      host: process.env.BUCKET_SERVICE_HOST,
      port: process.env.BUCKET_SERVICE_PORT,
    },
    transport: Transport.TCP,
  },
});
