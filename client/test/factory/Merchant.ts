import {
  ActivityStatus,
  Merchant,
  MerchantRequest,
} from "../../src/service/Merchant";
import { v4 as uuid } from "uuid";

export const createMerchant = (): Merchant => ({
  id: uuid(),
  status: ActivityStatus.active,
  currency: "AUD",
  websiteUrl: "https://example.com",
  country: "Australia",
  isDeleted: false,
  discountPercentage: 15.5,
  createdAt: new Date(),
  updatedAt: new Date(),
});
