export enum ResponseCode {
  //success
  OK = 'OK',
  ADDED = 'ADDED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',

  //validation

  // warning
  //error
  ERROR = 'error.ERROR',
  NOT_FOUND = 'error.NOT_FOUND',
  TOKEN_MISSING = 'error.TOKEN_MISSING',
  TOKEN_INVALID = 'error.TOKEN_INVALID',
  TOKEN_EXPIRED = 'error.TOKEN_EXPIRED',
  FORBIDDEN = 'error.FORBIDDEN',
}
