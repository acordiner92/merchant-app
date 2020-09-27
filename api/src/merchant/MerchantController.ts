import { Request, Response, NextFunction } from 'express';
import { Merchant, MerchantRequest } from './Merchant';
import { ResourceNotFound } from '../error/ResourceNotFound';
import {
  CreateMerchant,
  GetMerchantById,
  GetMerchantsByFilter,
  RemoveMerchant,
  UpdateMerchant,
} from './MerchantService';

/**
 * Create a new merchant endpoint.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response<Merchant>>}
 */
export const createMerchant = (createMerchant: CreateMerchant) => async (
  request: Request,
  response: Response,
): Promise<Response<Merchant>> => {
  const merchantRequest = request.body as MerchantRequest; // TODO: add validation

  const createdMerchant = await createMerchant(merchantRequest);

  return response.status(201).send(createdMerchant);
};

/**
 * Updates an existing merchant endpoint.
 * Will return 404 if merchant does not exist.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const updateMerchant = (updateMerchant: UpdateMerchant) => async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { merchantId } = request.params;
  const merchantRequest = request.body as MerchantRequest; // TODO: add validation

  const updatedMerchantResult = await updateMerchant(
    merchantId,
    merchantRequest,
  );
  if (updatedMerchantResult.isErr()) {
    return next(updatedMerchantResult._unsafeUnwrapErr());
  } else {
    return response.sendStatus(204);
  }
};

/**
 * Deletes a merchant endpoint.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const removeMerchant = (removeMerchant: RemoveMerchant) => async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { merchantId } = request.params;

  await removeMerchant(merchantId);

  return response.sendStatus(204);
};
/**
 * Gets a merchant by merchant id endpoint.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response>}
 */
export const getMerchant = (getMerchantById: GetMerchantById) => async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const { merchantId } = request.params;

  const merchant = await getMerchantById(merchantId);

  if (!merchant) {
    return next(new ResourceNotFound(`merchant ${merchantId} is not found`));
  } else {
    return response.send(merchant);
  }
};

/**
 * Gets a list of merchant by a search filter endpoint.
 *
 * @param {Request} request
 * @param {Response} response
 * @returns {Promise<Response<ReadonlyArray<Merchant>>>}
 */
export const getMerchants = (
  getMerchantsByFilter: GetMerchantsByFilter,
) => async (
  request: Request,
  response: Response,
): Promise<Response<ReadonlyArray<Merchant>>> => {
  const { limit, offset } = request.query; // TODO: validation

  const merchants = await getMerchantsByFilter({
    limit: limit ? parseInt(limit.toString()) : 100,
    offset: offset ? parseInt(offset.toString()) : 0,
  });
  return response.send(merchants);
};
