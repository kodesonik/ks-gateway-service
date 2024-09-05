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
    console.log('response', exception);
    // console.log('current lang', i18nCtx?.lang);

    const status = exception.getStatus();
    const data = exception.getResponse() as any;
    console.log('data', data);
    const message = data.message || ResponseCode.ERROR;
    let error = data.message || ResponseCode.ERROR;
    if (typeof message === 'string') {
      data.message = i18nCtx?.t(message as never);
    } else if (Array.isArray(message)) {
      data.message = message.map((msg) => i18nCtx?.t(msg as never)).join(', ');
      error = ResponseCode.INAVLID_PARAMETER;
    }
    const apiReponse: IErrorResponse = {
      status,
      error,
      message: data.message,
      timestamp: new Date().toISOString(),
    };
    response.status(status).json(apiReponse);
  }
}
