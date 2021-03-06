import React, { ReactElement } from 'react';
import { Merchant } from '../service/Merchant';
import './MerchantList.css';

type MerchantListProps = {
  merchants: ReadonlyArray<Merchant>;
  onEdit: (merchantId: string) => void;
  onDelete: (merchantId: string) => void;
};

export const MerchantList = ({
  merchants,
  onEdit,
  onDelete,
}: MerchantListProps): ReactElement => {
  return (
    <table className="table">
      <thead className="table-header">
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
        {!merchants.length && (
          <tr>
            <td>No Results Found</td>
          </tr>
        )}
        {merchants &&
          merchants.map((merchant, i) => (
            <tr className="table-row" data-testid="merchant-list-item" key={i}>
              <td>{merchant.websiteUrl}</td>
              <td>{merchant.status}</td>
              <td>{merchant.country}</td>
              <td>{merchant.currency}</td>
              <td>{merchant.discountPercentage}</td>
              <td>
                <button className="button" onClick={() => onEdit(merchant.id)}>
                  edit
                </button>
              </td>
              <td>
                <button
                  className="button"
                  onClick={() => onDelete(merchant.id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
