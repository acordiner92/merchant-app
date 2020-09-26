import { v4 as uuid } from 'uuid';
import { ActivityStatus, Merchant } from '../src/Merchant';
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
  discountPercentage: 15.0,
});
