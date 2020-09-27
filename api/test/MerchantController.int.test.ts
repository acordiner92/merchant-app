import request from 'supertest';
import { ActivityStatus } from '../src/Merchant';
import { loadMerchantRoutes } from '../src/MerchantRouter';
import { createServer } from '../src/Server';
import { createMerchantRequest } from './MerchantFactory';
import { v4 as uuid } from 'uuid';

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
      await request(app).post(routeUrl).send(merchantRequest).expect(201);
    });
  });

  describe('getMerchant', () => {
    test('404 is returned if no merchant is found', async () => {
      const nonExistentId = uuid();

      await request(app).get(`${routeUrl}/${nonExistentId}`).expect(404);
    });

    test('merchant is return if exists', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      const getResponse = await request(app).get(
        `${routeUrl}/${createdResponse.body.id}`,
      );
      expect(getResponse.body).toStrictEqual(createdResponse.body);
    });

    test('200 status is returned', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app)
        .get(`${routeUrl}/${createdResponse.body.id}`)
        .expect(200);
    });
  });
});
