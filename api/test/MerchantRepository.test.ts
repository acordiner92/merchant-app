import { Merchant } from '../src/Merchant';
import { create } from '../src/MerchantRepository';
import { getClient, getConnection } from '../src/PostgresConnection';
import { createMerchant } from './MerchantFactory';

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
});
