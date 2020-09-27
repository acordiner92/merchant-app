import express, { Express } from 'express';
import { MerchantRouter } from './merchant/MerchantRouter';
import cors from 'cors';
import { errorMiddleware } from './ErrorMiddleware';
import expressPinoLogger from 'express-pino-logger';
import Logger from './Logger';

export const createServer = (merchantRouter: MerchantRouter): Express => {
  const app = express();

  // global middlewares
  app.use(express.json());
  app.use(cors());
  app.use(expressPinoLogger({ prettyPrint: { colorize: true } }));

  app.use('/api/v1/merchant', merchantRouter.router);

  // response middlewares
  app.use(errorMiddleware(Logger));

  return app;
};
