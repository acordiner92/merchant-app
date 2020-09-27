import { Merchant, MerchantRequest } from './Merchant';

const routeUrl = 'http://localhost:8080/api/v1/merchant';
export const createMerchant = async (
  merchantRequest: MerchantRequest,
): Promise<Merchant> => {
  const createdMerchant = await fetch(routeUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchantRequest),
  });

  return createdMerchant.json();
};

export const updateMerchant = async (
  merchantId: string,
  merchantRequest: MerchantRequest,
): Promise<void> => {
  await fetch(`${routeUrl}/${merchantId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(merchantRequest),
  });
};

export const removeMerchant = async (merchantId: string): Promise<void> => {
  await fetch(`${routeUrl}/${merchantId}`, {
    method: 'DELETE',
  });
};

export const getMerchants = async (): Promise<ReadonlyArray<Merchant>> => {
  const merchants = await fetch(routeUrl);
  return merchants.json();
};

export const getMerchant = async (id: string): Promise<Merchant> => {
  const merchant = await fetch(`${routeUrl}/${id}`);
  return merchant.json();
};
