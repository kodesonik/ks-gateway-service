import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { I18nContext, I18nTranslation } from 'nestjs-i18n';
import { IErrorResponse } from 'src/types';
import { ResponseCode } from 'src/types/enums/response-code';
@Catch()
export class LangExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const i18nCtx = I18nContext.current<I18nTranslation>();
    console.log('current lang', i18nCtx.lang);
    const status = exception.getStatus();
    const data = exception.getResponse() as any;
    const apiReponse: IErrorResponse = {
      status,
      error: data.message,
      message: i18nCtx.t(
        (data.message as never) || (ResponseCode.ERROR as never),
      ),
      timestamp: new Date().toISOString(),
    };
    response.status(status).json(apiReponse);
  }
}
