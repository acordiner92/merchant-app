import React, { useState, useEffect, ReactElement } from 'react';
import { MerchantList } from '../component/MerchantList';
import { Merchant } from '../service/Merchant';
import { getMerchants, removeMerchant } from '../service/MerchantService';
import { useHistory } from 'react-router-dom';

export const MerchantHome = (): ReactElement => {
  const [merchants, setMerchants] = useState<ReadonlyArray<Merchant>>([]);
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
    <div className="merchant-home">
      <h1>Merchants</h1>
      <MerchantList
        onEdit={onEdit}
        onDelete={onDelete}
        merchants={merchants}
      ></MerchantList>
    </div>
  );
};
