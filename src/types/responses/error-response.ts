import { ResponseCode } from '../enums/response-code';

export interface IErrorResponse {
  status: number;
  error: ResponseCode;
  message: string;
  timestamp: string;
}
