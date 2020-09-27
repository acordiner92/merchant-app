import { create, Merchant, MerchantRequest } from './Merchant';
import * as MerchantRepository from './MerchantRepository';

export const createMerchant = (createToDb: MerchantRepository.Create) => (
  merchantRequest: MerchantRequest,
): Promise<Merchant> => createToDb(create(merchantRequest));

export type CreateMerchant = ReturnType<typeof createMerchant>;

export const getMerchantById = (getById: MerchantRepository.GetById) => (
  merchantId: string,
): Promise<Merchant | null> => getById(merchantId);
export type GetMerchantById = ReturnType<typeof getMerchantById>;
