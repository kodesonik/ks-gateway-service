export enum ResponseCode {
  //success
  OK = 'OK',
  ADDED = 'ADDED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',

  //validation

  // warning
  //error
  ERROR = 'ERROR',
  NOT_FOUND = 'NOT_FOUND',
  TOKEN_MISSING = 'error.TOKEN_MISSING',
  TOKEN_INVALID = 'TOKEN_INVALID',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
}
