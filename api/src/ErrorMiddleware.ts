import { NextFunction, Request, Response } from 'express';
import { Logger } from 'pino';
import { mapErrorToHttpError } from './HttpErrorMapper';

export const errorMiddleware = (logger: Logger) => (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  const httpErrorResponse = mapErrorToHttpError(error);
  logger.error(error);
  return response.status(httpErrorResponse.statusCode).send(httpErrorResponse);
};
