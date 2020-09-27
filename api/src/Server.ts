import express, { Express } from 'express';
import { loadMerchantRoutes } from './MerchantRouter';

export const createServer = (): Express => {
  const app = express();

  const merchantConfig = {
    postgres: {
      user: 'postgres',
      host: 'localhost',
      database: 'merchant',
      password: 'postgres',
      port: 5432,
    },
  };

  // global middlewares
  app.use(express.json());

  app.use('/api/v1/merchant', loadMerchantRoutes(merchantConfig).router);

  return app;
};
