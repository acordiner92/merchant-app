import { v4 as uuid } from 'uuid';
import { getUtcDateNow } from '../DateUtil';

export const ActivityStatus = {
  active: 'ACTIVE',
  inactive: 'INACTIVE',
};
export type ActivityStatus = typeof ActivityStatus[keyof typeof ActivityStatus];

export type Merchant = {
  readonly id: string;
  readonly status: ActivityStatus;
  readonly currency: string;
  readonly websiteUrl: string;
  readonly country: string;
  readonly discountPercentage: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly isDeleted: boolean;
};

export type MerchantRequest = {
  readonly status: ActivityStatus;
  readonly currency: string;
  readonly websiteUrl: string;
  readonly country: string;
  readonly discountPercentage: number;
};
export type MerchantSearchFilter = {
  readonly limit: number;
  readonly offset: number;
};

/**
 * Creates a new instance of a merchant from a merchant request.
 *
 * @param {MerchantRequest} merchantRequest
 * @returns {Merchant}
 */
export const create = (merchantRequest: MerchantRequest): Merchant => ({
  ...merchantRequest,
  id: uuid(),

  createdAt: getUtcDateNow(),
  updatedAt: getUtcDateNow(),
  isDeleted: false,
});

/**
 * Returns an updated merchant from the applied merchant request.
 *
 * @param {MerchantRequest} merchantRequest
 * @returns {Merchant}
 */
export const update = (
  merchantRequest: MerchantRequest,
  existingMerchant: Merchant,
): Merchant => ({
  ...existingMerchant,
  ...merchantRequest,
  updatedAt: getUtcDateNow(),
});

/**
 * Marks merchant as deleted.
 *
 * @param {Merchant} existingMerchant
 * @returns {Merchant}
 */
export const remove = (existingMerchant: Merchant): Merchant => ({
  ...existingMerchant,
  isDeleted: true,
});
