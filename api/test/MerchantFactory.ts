import { v4 as uuid } from 'uuid';
import { getUtcDateNow } from '../src/DateUtil';
import { ActivityStatus, Merchant, MerchantRequest } from '../src/Merchant';
/**
 * Creates an example merchant for testing.
 *
 * @returns {Merchant}
 */
export const createMerchant = (): Merchant => ({
  id: uuid(),
  status: ActivityStatus.active,
  currency: 'AUD',
  websiteUrl: 'https://example.com',
  country: 'Australia',
  discountPercentage: 15.5,
  createdAt: getUtcDateNow(),
  updatedAt: getUtcDateNow(),
});

/**
 * Creates an example merchant request for testing
 *
 * @returns {MerchantRequest}
 */
export const createMerchantRequest = (): MerchantRequest => ({
  status: ActivityStatus.active,
  currency: 'AUD',
  websiteUrl: 'https://example.com',
  country: 'Australia',
  discountPercentage: 15.5,
});
