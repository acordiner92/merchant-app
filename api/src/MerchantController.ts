import { Request, Response } from 'express';
import { Merchant, MerchantRequest } from './Merchant';
import { CreateMerchant, GetMerchantById } from './MerchantService';

export const createMerchant = (createMerchant: CreateMerchant) => async (
  request: Request,
  response: Response,
): Promise<Response<Merchant>> => {
  const merchantRequest = request.body as MerchantRequest; // TODO: add validation

  const createdMerchant = await createMerchant(merchantRequest);

  return response.status(201).send(createdMerchant);
};

export const getMerchant = (getMerchantById: GetMerchantById) => async (
  request: Request,
  response: Response,
): Promise<Response> => {
  const { merchantId } = request.params;

  const merchant = await getMerchantById(merchantId);
  return response.send(merchant);
};
