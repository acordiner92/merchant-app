import request from 'supertest';
import { ActivityStatus, remove } from '../../src/merchant/Merchant';
import { loadMerchantRoutes } from '../../src/merchant/MerchantRouter';
import { createServer } from '../../src/Server';
import { createMerchantRequest } from './MerchantFactory';
import { v4 as uuid } from 'uuid';
import { getById } from '../../src/merchant/MerchantRepository';

describe('MerchantController', () => {
  const routeUrl = '/api/v1/merchant';

  const merchantRouter = loadMerchantRoutes({
    postgres: {
      user: 'postgres',
      host: 'localhost',
      database: 'merchant_test',
      password: 'postgres',
      port: 5431,
    },
  });
  const {
    dependencies: { postgresClient, postgresConnection },
  } = merchantRouter;
  const app = createServer(merchantRouter);

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

    test('400 status is returned if request is invalid', async () => {
      const merchantRequest = createMerchantRequest();
      await request(app)
        .post(routeUrl)
        .send({ ...merchantRequest, discountPercentage: 'wrongValue' })
        .expect(400);
    });
  });

  describe('updateMerchant', () => {
    test('Merchant is updated', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);
      await request(app)
        .put(`${routeUrl}/${createdResponse.body.id}`)
        .send({ ...merchantRequest, currency: 'USD' });

      const response = await request(app).get(
        `${routeUrl}/${createdResponse.body.id}`,
      );
      expect(response.body.currency).toBe('USD');
    });

    test('204 status is returned', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app)
        .put(`${routeUrl}/${createdResponse.body.id}`)
        .send({ ...merchantRequest, currency: 'USD' })
        .expect(204);
    });

    test('400 status is returned if request is invalid', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app)
        .put(`${routeUrl}/${createdResponse.body.id}`)
        .send({ ...merchantRequest, discountPercentage: 'wrongValue' })
        .expect(400);
    });

    test('404 status is returned if merchant is not found', async () => {
      const merchantRequest = createMerchantRequest();
      const nonExistentId = uuid();
      await request(app)
        .put(`${routeUrl}/${nonExistentId}`)
        .send(merchantRequest)
        .expect(404);
    });
  });

  describe('removeMerchant', () => {
    test('204 status is returned', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app)
        .delete(`${routeUrl}/${createdResponse.body.id}`)
        .expect(204);
    });

    test('204 status is returned if merchant does not exist', async () => {
      const nonExistentId = uuid();

      await request(app).delete(`${routeUrl}/${nonExistentId}`).expect(204);
    });

    test('removed merchant is soft deleted', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app).delete(`${routeUrl}/${createdResponse.body.id}`);

      const removedMerchant = await getById(postgresClient)(
        createdResponse.body.id,
      );
      // since getById wont retrieve deleted merchants is should return null
      expect(removedMerchant).toBeNull();
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

  describe('getMerchant', () => {
    test('merchants are returned', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      const response = await request(app).get(`${routeUrl}`);
      expect(response.body).toStrictEqual([createdResponse.body]);
    });

    test('merchants are returned', async () => {
      const merchantRequest = createMerchantRequest();
      await request(app).post(routeUrl).send(merchantRequest);

      await request(app).get(`${routeUrl}`).expect(200);
    });

    test('empty array is returned if no results', async () => {
      const response = await request(app).get(`${routeUrl}`).expect(200);
      expect(response.body).toStrictEqual([]);
    });

    test('deleted merchants are not returned', async () => {
      const merchantRequest = createMerchantRequest();
      const createdResponse = await request(app)
        .post(routeUrl)
        .send(merchantRequest);

      await request(app).delete(`${routeUrl}/${createdResponse.body.id}`);

      const response = await request(app).get(`${routeUrl}`);
      expect(response.body).toStrictEqual([]);
    });
  });
});
