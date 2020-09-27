import React, { ReactElement, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ActivityStatus, MerchantRequest } from '../service/Merchant';
import './MerchantForm.css';

type MerchantFormProps = {
  initialValues?: MerchantRequest;
  onSubmit: SubmitHandler<MerchantRequest>;
};

export const MerchantForm = ({
  onSubmit,
  initialValues,
}: MerchantFormProps): ReactElement => {
  const { register, handleSubmit, errors, reset, control } = useForm<
    MerchantRequest
  >({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset({ ...initialValues });
  }, [initialValues]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>Status*</label>
      <select name="status" className="input-text" ref={register}>
        <option value={ActivityStatus.active}>Active</option>
        <option value={ActivityStatus.inactive}>Inactive</option>
      </select>
      <label>Currency*</label>
      <select name="currency" className="input-text" ref={register}>
        <option value={'USD'}>USD</option>
        <option value={'AUD'}>AUD</option>
        <option value={'YEN'}>YEN</option>
        <option value={'NZD'}>NZD</option>
      </select>
      <label>Country*</label>
      <select name="country" className="input-text" ref={register}>
        <option value={'UNITED_STATES'}>United States</option>
        <option value={'AUSTRALIA'}>Australia</option>
        <option value={'JAPAN'}>Japan</option>
        <option value={'NEW_ZEALAND'}>New Zealand</option>
      </select>
      <label>Website Url*</label>
      <input
        name="websiteUrl"
        className="input-text"
        ref={register({ required: true })}
      />
      {errors.websiteUrl && <span>This field is required</span>}

      <label>Discount (%)*</label>
      <Controller
        name="discountPercentage"
        render={({ value, onChange }) => (
          <input
            type="number"
            className="input-text"
            value={value}
            onChange={e => onChange(parseFloat(e.target.value))}
          />
        )}
        control={control}
        defaultValue={0}
      ></Controller>
      {errors.discountPercentage && <span>This field is required</span>}

      <button className="button" type="submit">
        Save
      </button>
    </form>
  );
};
