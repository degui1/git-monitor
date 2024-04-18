import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { existsSync, mkdir, mkdirSync, writeFileSync } from 'fs';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const context = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date(),
      path: httpAdapter.getRequestUrl(context.getRequest()),
    };

    httpAdapter.reply(context.getResponse(), responseBody, httpStatus);
  }

  private writeLogError(errorTemplateString: string): void {
    if (!existsSync(process.env.LOG_FOLDER)) {
      mkdirSync(process.env.LOG_FOLDER);
    }
    writeFileSync(`${process.env.LOG_FOLDER}/error.log`, errorTemplateString);
  }
}
