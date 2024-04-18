export interface IHttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface ICustomHttpExceptionResponse extends IHttpExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
}
