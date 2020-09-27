import express, { Router } from 'express';
import { Merchant } from './Merchant';
import {
  createMerchant,
  updateMerchant,
  removeMerchant,
  getMerchant,
} from './MerchantController';
import { create, update, getById } from './MerchantRepository';
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
  const updateMerchantFn = MerchantService.updateMerchant(
    update(dbClient),
    getByIdFn,
  );
  const removeMerchantFn = MerchantService.removeMerchant(
    update(dbClient),
    getByIdFn,
  );

  router.post('/', createMerchant(createMerchantFn));
  router.put('/:merchantId', updateMerchant(updateMerchantFn));
  router.delete('/:merchantId', removeMerchant(removeMerchantFn));

  router.get('/:merchantId', getMerchant(getByIdFn));

  return {
    router,
    dependencies: {
      postgresConnection: dbConnection,
      postgresClient: dbClient,
    },
  };
};
