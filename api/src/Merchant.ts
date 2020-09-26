import { v4 as uuid } from 'uuid';
import { getUtcDateNow } from './DateUtil';

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
};

export type MerchantRequest = {
  readonly status: ActivityStatus;
  readonly currency: string;
  readonly websiteUrl: string;
  readonly country: string;
  readonly discountPercentage: number;
};

export const create = (merchantRequest: MerchantRequest): Merchant => ({
  ...merchantRequest,
  id: uuid(),
  createdAt: getUtcDateNow(),
  updatedAt: getUtcDateNow(),
});
