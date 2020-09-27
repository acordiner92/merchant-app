import React from "react";
import { Merchant } from "../service/Merchant";

type MerchantListProps = {
  merchants: ReadonlyArray<Merchant>;
  onEdit: (merchantId: string) => void;
};

export const MerchantList = ({ merchants, onEdit }: MerchantListProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Website</th>
          <th>Status</th>
          <th>Country</th>
          <th>Currency</th>
          <th>Discount (%)</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {merchants.map((merchant, i) => (
          <tr key={i}>
            <td>{merchant.websiteUrl}</td>
            <td>{merchant.status}</td>
            <td>{merchant.country}</td>
            <td>{merchant.currency}</td>
            <td>{merchant.discountPercentage}</td>
            <td>
              <button onClick={() => onEdit(merchant.id)}>edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
