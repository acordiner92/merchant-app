import { NextFunction, Request, Response } from 'express';
import { Logger } from 'pino';
import { mapErrorToHttpError } from './HttpErrorMapper';

/**
 * Express error handler that maps application errors
 * to Http Error responses and returns them to the client.
 *
 * @param {Error} error
 * @param {Request} _request
 * @param {Response} response
 * @param {NextFunction} _next
 * @returns {Response}
 */
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
