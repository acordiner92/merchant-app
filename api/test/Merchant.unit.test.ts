import { ActivityStatus, create } from '../src/Merchant';
import { createMerchantRequest } from './MerchantFactory';

const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

describe('Merchant', () => {
  describe('create', () => {
    test('creates a new merchant', () => {
      const merchantRequest = createMerchantRequest();
      const merchant = create(merchantRequest);
      expect(merchant).toStrictEqual(
        expect.objectContaining({
          status: ActivityStatus.active,
          currency: 'AUD',
          websiteUrl: 'https://example.com',
          country: 'Australia',
          discountPercentage: 15.5,
        }),
      );
    });

    test('a new uuid is generated for merchant', () => {
      const merchantRequest = createMerchantRequest();
      const merchant = create(merchantRequest);

      expect(merchant.id).toMatch(uuidRegex);
    });
  });
});
