import { ResourceNotFound } from '../../src/error/ResourceNotFound';
import { ValidationError } from '../../src/error/ValidationError';
import { mapErrorToHttpError } from '../../src/HttpErrorMapper';

describe('HttpErrorMapper', () => {
  describe('mapErrorToHttpError', () => {
    test('ResourceNotFound maps to 404', () =>
      expect(mapErrorToHttpError(new ResourceNotFound()).statusCode).toBe(404));

    test('ValidationError returns as 400', () =>
      expect(mapErrorToHttpError(new ValidationError()).statusCode).toBe(400));

    test('Uncaught error returns as 500', () =>
      expect(mapErrorToHttpError(new Error()).statusCode).toBe(500));
  });
});
