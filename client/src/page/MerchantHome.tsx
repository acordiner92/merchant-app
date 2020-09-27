import React, { useState, useEffect } from "react";
import { MerchantList } from "../component/MerchantList";
import { Merchant } from "../service/Merchant";
import { getMerchants } from "../service/MerchantService";

export const MerchantHome = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);

  useEffect(() => {
    getMerchants().then(setMerchants);
  }, []);

  return (
    <>
      <h1>View Merchants</h1>
      <MerchantList merchants={merchants}></MerchantList>
    </>
  );
};
