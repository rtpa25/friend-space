import express from 'express';
import config from 'config';
import logger from './utils/logger';
import routes from './routes';
import { connect } from './utils/connect';
import { deserializeUser } from './middlewares/deserializeUser';

const port = config.get<number>('port');

const app = express();

app.use(express.json());
app.use(deserializeUser);

app.listen(port, async () => {
  await connect();
  routes(app);
  logger.info(`app running on http://localhost:${port} 🚀`);
});
