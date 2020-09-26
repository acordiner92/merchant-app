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
};
