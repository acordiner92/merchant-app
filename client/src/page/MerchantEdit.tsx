import React, { ReactElement, useEffect, useState } from 'react';
import { MerchantForm } from '../component/MerchantForm';
import {
  createMerchant,
  getMerchant,
  updateMerchant,
} from '../service/MerchantService';
import { Merchant, MerchantRequest } from '../service/Merchant';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

type MerchantRouteParams = {
  id: string;
};

export const MerchantEdit = (): ReactElement => {
  const params = useParams<MerchantRouteParams>();
  const [merchant, setMerchant] = useState<Merchant>();
  const history = useHistory();
  const isEditable = !!params.id;

  useEffect(() => {
    if (params.id) {
      getMerchant(params.id).then(setMerchant);
    }
  }, []);

  const onSubmit = async (merchantRequest: MerchantRequest) => {
    await (isEditable
      ? updateMerchant(params.id, merchantRequest)
      : createMerchant(merchantRequest));
    return history.push(`/`);
  };

  return (
    <>
      <h1>Merchant</h1>
      <MerchantForm initialValues={merchant} onSubmit={onSubmit}></MerchantForm>
    </>
  );
};
