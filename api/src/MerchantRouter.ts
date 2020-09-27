import express, { Router } from 'express';
import { Merchant } from './Merchant';
import { createMerchant, getMerchant } from './MerchantController';
import { create, getById } from './MerchantRepository';
import { getClient, getConnection } from './PostgresConnection';
import * as MerchantService from './MerchantService';
import { IDatabase, IMain } from 'pg-promise';
import { IConnectionParameters } from 'pg-promise/typescript/pg-subset';

type MerchantRouter = {
  readonly router: Router;
  readonly dependencies: {
    readonly postgresConnection: IMain;
    readonly postgresClient: IDatabase<Merchant>;
  };
};

type MerchantConfig = {
  readonly postgres: IConnectionParameters;
};

export const loadMerchantRoutes = (config: MerchantConfig): MerchantRouter => {
  const router = express.Router();

  const dbConnection = getConnection();
  const dbClient = getClient<Merchant>(dbConnection, config.postgres);

  // IOC
  // Added dependencies in via partial application.
  const getByIdFn = getById(dbClient);
  const createMerchantFn = MerchantService.createMerchant(create(dbClient));

  router.post('/', createMerchant(createMerchantFn));

  router.get('/:merchantId', getMerchant(getByIdFn));

  return {
    router,
    dependencies: {
      postgresConnection: dbConnection,
      postgresClient: dbClient,
    },
  };
};
