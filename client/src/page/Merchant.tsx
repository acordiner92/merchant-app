import React from "react";
import { MerchantForm } from "../component/MerchantForm";
import { createMerchant } from "../service/MerchantService";

export const Merchant = () => {
  return (
    <>
      <h1>Create Merchant</h1>
      <MerchantForm onSubmit={createMerchant}></MerchantForm>
    </>
  );
};
