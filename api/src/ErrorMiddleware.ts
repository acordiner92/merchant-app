import { NextFunction, Request, Response } from 'express';
import { mapErrorToHttpError } from './HttpErrorMapper';

export const errorMiddleware = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
): Response => {
  const httpErrorResponse = mapErrorToHttpError(error);
  return response.status(httpErrorResponse.statusCode).send(httpErrorResponse);
};
