import { loadMerchantRoutes } from './merchant/MerchantRouter';
import { createServer } from './Server';
import Logger from './Logger';

const merchantConfig = {
  postgres: {
    user: 'postgres',
    host: 'localhost',
    database: 'merchant',
    password: 'postgres',
    port: 5432,
  },
};

const app = createServer(loadMerchantRoutes(merchantConfig));

app.listen(8080, () => Logger.info('Started merchant api...'));
