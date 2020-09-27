import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ActivityStatus, MerchantRequest } from '../service/Merchant';

type MerchantFormProps = {
  initialValues?: MerchantRequest;
  onSubmit: SubmitHandler<MerchantRequest>;
};

export const MerchantForm = ({
  onSubmit,
  initialValues,
}: MerchantFormProps): ReactElement => {
  const { register, handleSubmit, errors, reset } = useForm<MerchantRequest>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset({ ...initialValues });
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Status*</label>
      <select name="status" ref={register}>
        <option value={ActivityStatus.active}>Active</option>
        <option value={ActivityStatus.inactive}>Inactive</option>
      </select>
      <label>Currency*</label>
      <select name="currency" ref={register}>
        <option value={'USD'}>USD</option>
        <option value={'AUD'}>AUD</option>
        <option value={'YEN'}>YEN</option>
        <option value={'NZD'}>NZD</option>
      </select>
      <label>Country*</label>
      <select name="country" ref={register}>
        <option value={'UNITED_STATES'}>United States</option>
        <option value={'AUSTRALIA'}>Australia</option>
        <option value={'JAPAN'}>Japan</option>
        <option value={'NEW_ZEALAND'}>New Zealand</option>
      </select>
      <label>Website Url*</label>
      <input name="websiteUrl" ref={register({ required: true })} />
      {errors.websiteUrl && <span>This field is required</span>}

      <label>Discount (%)*</label>
      <input name="discountPercentage" ref={register({ required: true })} />
      {errors.discountPercentage && <span>This field is required</span>}

      <button type="submit">Save</button>
    </form>
  );
};
