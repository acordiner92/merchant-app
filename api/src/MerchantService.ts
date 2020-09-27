import {
  create,
  Merchant,
  MerchantRequest,
  MerchantSearchFilter,
  remove,
  update,
} from './Merchant';
import * as MerchantRepository from './MerchantRepository';
import { GetByFilter } from './MerchantRepository';

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

export const removeMerchant = (
  updateToDb: MerchantRepository.Update,
  getById: MerchantRepository.GetById,
) => async (merchantId: string): Promise<void> => {
  const existingMerchant = await getById(merchantId);
  if (existingMerchant) {
    return updateToDb(remove(existingMerchant));
  } else {
    return;
  }
};
export type RemoveMerchant = ReturnType<typeof removeMerchant>;

export const getMerchantById = (getById: MerchantRepository.GetById) => (
  merchantId: string,
): Promise<Merchant | null> => getById(merchantId);
export type GetMerchantById = ReturnType<typeof getMerchantById>;

export const getMerchantsByFilter = (getByFilter: GetByFilter) => (
  filter: MerchantSearchFilter,
): Promise<ReadonlyArray<Merchant>> => getByFilter(filter);
export type GetMerchantsByFilter = ReturnType<typeof getMerchantsByFilter>;
