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
import { err, Result, ok } from 'neverthrow';
import { ResourceNotFound } from '../error/ResourceNotFound';
/**
 * Creates a new merchant.
 *
 * @param {MerchantRequest} merchantRequest
 * @returns {Promise<Merchant>}
 */
export const createMerchant = (createToDb: MerchantRepository.Create) => (
  merchantRequest: MerchantRequest,
): Promise<Merchant> => createToDb(create(merchantRequest));

export type CreateMerchant = ReturnType<typeof createMerchant>;

/**
 * Updates an existing merchant if it exists.
 *
 * @param {string} merchantId
 * @param {MerchantRequest} merchantRequest
 * @returns {Promise<Result<void, ResourceNotFound>>}
 */
export const updateMerchant = (
  updateToDb: MerchantRepository.Update,
  getById: MerchantRepository.GetById,
) => async (
  merchantId: string,
  merchantRequest: MerchantRequest,
): Promise<Result<void, ResourceNotFound>> => {
  const existingMerchant = await getById(merchantId);
  if (existingMerchant) {
    return ok(await updateToDb(update(merchantRequest, existingMerchant)));
  } else {
    return err(new ResourceNotFound(`Merchant ${merchantId} does not exist`));
  }
};
export type UpdateMerchant = ReturnType<typeof updateMerchant>;

/**
 * Soft deletes a merchant.
 *
 * @param {string} merchantId
 * @returns {Promise<void>}
 */
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

/**
 * Gets a merchant by id.
 *
 * @param {string} merchantId
 * @returns {(Promise<Merchant | null>)}
 */
export const getMerchantById = (getById: MerchantRepository.GetById) => (
  merchantId: string,
): Promise<Merchant | null> => getById(merchantId);
export type GetMerchantById = ReturnType<typeof getMerchantById>;

/**
 * Gets a list of merchants based off the MerchantSearchFilter.
 *
 * @param {MerchantSearchFilter} filter
 * @returns {Promise<ReadonlyArray<Merchant>>}
 */
export const getMerchantsByFilter = (getByFilter: GetByFilter) => (
  filter: MerchantSearchFilter,
): Promise<ReadonlyArray<Merchant>> => getByFilter(filter);
export type GetMerchantsByFilter = ReturnType<typeof getMerchantsByFilter>;
