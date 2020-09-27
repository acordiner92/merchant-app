import { utcDate } from '../../src/DateUtil';
import { ActivityStatus, create, remove, update } from '../../src/merchant/Merchant';
import { createMerchant, createMerchantRequest } from './MerchantFactory';

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

  describe('update', () => {
    test('merchant fields are updated', () => {
      const merchantRequest = createMerchantRequest();
      const existingMerchant = createMerchant();
      const updatedMerchant = update(merchantRequest, existingMerchant);

      expect(updatedMerchant).toStrictEqual(
        expect.objectContaining(merchantRequest),
      );
    });

    test('merchant updatedAt is updated to current time', () => {
      const dateBefore = utcDate(new Date(new Date().getTime() - 10));
      const merchantRequest = createMerchantRequest();
      const existingMerchant = createMerchant();
      const updatedMerchant = update(merchantRequest, existingMerchant);

      expect(updatedMerchant.updatedAt.getTime()).toBeGreaterThan(
        dateBefore.getTime(),
      );
    });
  });

  describe('remove', () => {
    test('isDelete field is set to true', () => {
      const existingMerchant = createMerchant();
      const deletedMerchant = remove(existingMerchant);
      expect(deletedMerchant.isDeleted).toBeTruthy();
    });
  });
});
