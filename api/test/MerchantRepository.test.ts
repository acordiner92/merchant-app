import { ActivityStatus, Merchant } from '../src/Merchant';
import { create, getById, update } from '../src/MerchantRepository';
import { getClient, getConnection } from '../src/PostgresConnection';
import { createMerchant } from './MerchantFactory';
import { v4 as uuid } from 'uuid';

describe('MerchantRepository', () => {
  const connection = getConnection();
  const client = getClient<Merchant>(connection, {
    user: 'postgres',
    host: 'localhost',
    database: 'merchant_test',
    password: 'postgres',
    port: 5431,
  });

  beforeEach(async () => {
    await client.none('TRUNCATE merchant CASCADE');
  });

  afterAll(async () => {
    await connection.end();
  });

  describe('create', () => {
    test('a new merchant is saved in the database', async () => {
      const merchant = createMerchant();
      const createdMerchant = await create(client)(merchant);

      expect(createdMerchant).toStrictEqual(expect.objectContaining(merchant));
    });
  });

  describe('update', () => {
    test('an existing merchant is updated in the database', async () => {
      const merchant = createMerchant();
      const createdMerchant = await create(client)(merchant);
      const merchantToUpdate = {
        ...createdMerchant,
        status: ActivityStatus.inactive,
        currency: 'YEN',
        websiteUrl: 'https://example.jp',
        country: 'Japan',
        discountPercentage: 25.1,
      };

      await update(client)(merchantToUpdate);

      const updatedMerchant = await getById(client)(merchant.id);
      expect(updatedMerchant).toStrictEqual(
        expect.objectContaining({
          status: ActivityStatus.inactive,
          currency: 'YEN',
          websiteUrl: 'https://example.jp',
          country: 'Japan',
          discountPercentage: 25.1,
        }),
      );
    });
  });

  describe('getById', () => {
    test('merchant is returned if exists', async () => {
      const merchant = createMerchant();
      await create(client)(merchant);

      const matchedMerchant = await getById(client)(merchant.id);
      expect(matchedMerchant).toStrictEqual(expect.objectContaining(merchant));
    });

    test('null if returned if merchant does not exist', async () => {
      const nonExistentId = uuid();

      const matchedMerchant = await getById(client)(nonExistentId);
      expect(matchedMerchant).toBeNull();
    });
  });
});
