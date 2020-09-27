import { createServer } from './Server';

const app = createServer();

app.listen(8080, () => {
  console.log('started app');
});
