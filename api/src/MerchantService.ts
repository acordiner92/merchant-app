import { create, Merchant, MerchantRequest, update } from './Merchant';
import * as MerchantRepository from './MerchantRepository';

export const createMerchant = (createToDb: MerchantRepository.Create) => (
  merchantRequest: MerchantRequest,
): Promise<Merchant> => createToDb(create(merchantRequest));

export type CreateMerchant = ReturnType<typeof createMerchant>;

export const updateMerchant = (
  updateToDb: MerchantRepository.Update,
  getById: MerchantRepository.GetById,
) => async (
  merchantId: string,
  merchantRequest: MerchantRequest,
): Promise<void> => {
  const existingMerchant = await getById(merchantId);
  if (existingMerchant) {
    return updateToDb(update(merchantRequest, existingMerchant));
  } else {
    // TODO: fix this to return a Result which is either success or failure
    throw Error('error');
  }
};
export type UpdateMerchant = ReturnType<typeof updateMerchant>;

export const getMerchantById = (getById: MerchantRepository.GetById) => (
  merchantId: string,
): Promise<Merchant | null> => getById(merchantId);
export type GetMerchantById = ReturnType<typeof getMerchantById>;
