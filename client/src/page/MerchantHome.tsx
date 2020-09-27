import React, { useState, useEffect } from "react";
import { MerchantList } from "../component/MerchantList";
import { Merchant } from "../service/Merchant";
import { getMerchants, removeMerchant } from "../service/MerchantService";
import { useHistory } from "react-router-dom";

export const MerchantHome = () => {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const history = useHistory();

  useEffect(() => {
    getMerchants().then(setMerchants);
  }, []);

  const onEdit = (merchantId: string) =>
    history.push(`/merchant/${merchantId}`);

  const onDelete = async (merchantId: string) => {
    await removeMerchant(merchantId);
    getMerchants().then(setMerchants);
  };

  return (
    <>
      <h1>View Merchants</h1>
      <MerchantList
        onEdit={onEdit}
        onDelete={onDelete}
        merchants={merchants}
      ></MerchantList>
    </>
  );
};
