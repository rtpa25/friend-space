import { Express } from 'express';
import {
  createSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controllers/session.controller';
import { createUserHandler } from './controllers/user.controller';
import { requireUser } from './middlewares/requireUser';
import { validateResource } from './middlewares/validateResource';
import { createSessionSchema } from './schemas/session.schema';
import { createUserSchema } from './schemas/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req, res) => res.send('hello world').status(200));

  //user routes
  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createSessionHandler
  );

  app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
