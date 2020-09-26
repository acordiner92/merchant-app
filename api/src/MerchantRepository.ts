import { IDatabase } from 'pg-promise';
import { Merchant } from './Merchant';
/**
 * Inserts a new merchant to the database.
 *
 * @param {Merchant} merchant
 * @returns {Promise<Merchant>}
 */
export const create = (db: IDatabase<Merchant>) => (
  merchant: Merchant,
): Promise<Merchant> =>
  db.one(
    `
    INSERT INTO merchant
    (id, status, currency, website_url, country, discount_percentage)
    VALUES ($(merchant.id), $(merchant.status), $(merchant.currency), $(merchant.websiteUrl), 
        $(merchant.country), $(merchant.discountPercentage))
    RETURNING id, status, currency, website_url, country, discount_percentage, created_at, updated_at
    `,
    { merchant },
  );
