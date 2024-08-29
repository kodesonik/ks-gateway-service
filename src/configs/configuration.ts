import { Transport } from '@nestjs/microservices';

export default () => ({
  port: parseInt(process.env.PORT, 10) || 4001,
  i18n: {
    fallbackLanguage: process.env.FALLBACK_LANGUAGE,
    watch: process.env.I18N_WATCH === 'true',
    // languages: process.env.LANGUAGES.split(','),
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
});
