import request from 'supertest';
import { ActivityStatus } from '../src/Merchant';
import { loadMerchantRoutes } from '../src/MerchantRouter';
import { createServer } from '../src/Server';
import { createMerchantRequest } from './MerchantFactory';

describe('MerchantController', () => {
  const routeUrl = '/api/v1/merchant';
  const app = createServer();
  const {
    router,
    dependencies: { postgresClient, postgresConnection },
  } = loadMerchantRoutes({
    postgres: {
      user: 'postgres',
      host: 'localhost',
      database: 'merchant_test',
      password: 'postgres',
      port: 5431,
    },
  });
  app.use('/api/v1/merchant', router);

  beforeEach(async () => {
    await postgresClient.none('TRUNCATE merchant CASCADE');
  });

  afterAll(async () => {
    await postgresConnection.end();
  });

  describe('createMerchant', () => {
    test('Created merchant is returned', async () => {
      const merchantRequest = createMerchantRequest();
      const response = await request(app).post(routeUrl).send(merchantRequest);
      expect(response.body).toStrictEqual(
        expect.objectContaining({
          status: ActivityStatus.active,
          currency: 'AUD',
          websiteUrl: 'https://example.com',
          country: 'Australia',
          discountPercentage: 15.5,
        }),
      );
    });

    test('201 status is returned', async () => {
      const merchantRequest = createMerchantRequest();
      const response = await request(app).post(routeUrl).send(merchantRequest);
      expect(response.status).toBe(201);
    });
  });
});
