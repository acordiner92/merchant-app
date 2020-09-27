import { ResourceNotFound } from '../../src/error/ResourceNotFound';
import { mapErrorToHttpError } from '../../src/HttpErrorMapper';

describe('HttpErrorMapper', () => {
  describe('mapErrorToHttpError', () => {
    test('ResourceNotFound maps to 404', () =>
      expect(mapErrorToHttpError(new ResourceNotFound()).statusCode).toBe(404));

    test('Uncaught error returns as 500', () =>
      expect(mapErrorToHttpError(new Error()).statusCode).toBe(500));
  });
});
