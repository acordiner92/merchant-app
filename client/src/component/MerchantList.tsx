import React from "react";
import { Merchant } from "../service/Merchant";

type MerchantListProps = {
  merchants: ReadonlyArray<Merchant>;
  onEdit: (merchantId: string) => void;
  onDelete: (merchantId: string) => void;
};

export const MerchantList = ({
  merchants,
  onEdit,
  onDelete,
}: MerchantListProps) => {
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        {!merchants.length && <tr>No Results Found</tr>}
        {merchants &&
          merchants.map((merchant, i) => (
            <tr key={i}>
              <td>{merchant.websiteUrl}</td>
              <td>{merchant.status}</td>
              <td>{merchant.country}</td>
              <td>{merchant.currency}</td>
              <td>{merchant.discountPercentage}</td>
              <td>
                <button onClick={() => onEdit(merchant.id)}>edit</button>
              </td>
              <td>
                <button onClick={() => onDelete(merchant.id)}>delete</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
