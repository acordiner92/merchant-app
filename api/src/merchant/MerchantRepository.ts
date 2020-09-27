import { IDatabase } from 'pg-promise';
import { Merchant, MerchantSearchFilter } from './Merchant';
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
    (id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at)
    VALUES ($(id), $(status), $(currency), $(websiteUrl), 
        $(country), $(discountPercentage), $(isDeleted), $(createdAt), $(updatedAt))
    RETURNING id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at
    `,
    merchant,
  );

export type Create = ReturnType<typeof create>;

/**
 * Updates an existing merchant in the database.
 *
 * @param {Merchant} merchant
 * @returns {Promise<void>}
 */
export const update = (db: IDatabase<Merchant>) => async (
  merchant: Merchant,
): Promise<void> => {
  await db.none(
    `
  UPDATE merchant
  SET status=$(status), currency=$(currency), website_url=$(websiteUrl), country=$(country), 
  discount_percentage=$(discountPercentage), updated_at=$(updatedAt), is_deleted=$(isDeleted)
  WHERE id=$(id)
  `,
    merchant,
  );
};
export type Update = ReturnType<typeof update>;

/**
 * Gets a merchant by id. if no match is found then
 * null is returned.
 *
 * @param {string} id
 * @returns {(Promise<Merchant | null>)}
 */
export const getById = (db: IDatabase<Merchant>) => async (
  id: string,
): Promise<Merchant | null> =>
  db.oneOrNone(
    `
    SELECT id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at
    FROM merchant
    WHERE id = $(id) AND is_deleted=false
    `,
    { id },
  );
export type GetById = ReturnType<typeof getById>;

/**
 * Gets a list of merchants by search filter options.
 *
 * @param {MerchantSearchFilter} filter
 * @returns {Promise<ReadonlyArray<Merchant>>}
 */
export const getByFilter = (db: IDatabase<Merchant>) => (
  filter: MerchantSearchFilter,
): Promise<ReadonlyArray<Merchant>> =>
  db.query(
    `
  SELECT id, status, currency, website_url, country, discount_percentage, is_deleted, created_at, updated_at 
  FROM merchant
  WHERE is_deleted=false
  ORDER BY country
  OFFSET $(offset)
  LIMIT $(limit)
  `,
    filter,
  );
export type GetByFilter = ReturnType<typeof getByFilter>;
