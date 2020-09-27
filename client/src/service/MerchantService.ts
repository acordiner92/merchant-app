import { MerchantRequest } from "./Merchant";

const routeUrl = "http://localhost:8080/api/v1/merchant";
export const createMerchant = async (merchantRequest: MerchantRequest) => {
  const createdMerchant = await fetch(routeUrl, {
    method: "POST",
    body: JSON.stringify(merchantRequest),
  });

  return createdMerchant.json();
};

export const updateMerchant = async (
  merchantId: string,
  merchantRequest: MerchantRequest
) => {
  await fetch(`${routeUrl}/${merchantId}`, {
    method: "PUT",
    body: JSON.stringify(merchantRequest),
  });
};

export const removeMerchant = async (merchantId: string) => {
  await fetch(`${routeUrl}/${merchantId}`, {
    method: "DELETE",
  });
};

export const getMerchants = async () => {
  const merchants = await fetch(routeUrl);
  console.log("merchants", merchants);
  return merchants.json();
};

export const getMerchant = async (id: string) => {
  const merchant = await fetch(`${routeUrl}/${id}`);
  return merchant.json();
};
