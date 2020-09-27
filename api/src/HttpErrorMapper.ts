import { ResourceNotFound } from './error/ResourceNotFound';
import { ValidationError } from './error/ValidationError';
export type HttpErrorResponse = {
  readonly statusCode: number;
  readonly message: string;
};

export const mapErrorToHttpError = (error: Error): HttpErrorResponse => {
  switch (Object.getPrototypeOf(error).constructor) {
    case ResourceNotFound: {
      return {
        statusCode: 404,
        message: error.message,
      };
    }
    case ValidationError: {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
    default:
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
  }
};
