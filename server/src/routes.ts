import { Express, Request, Response } from 'express';
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from './controllers/session.controller';
import {
  addFriendHandler,
  addInviteHandler,
  createUserHandler,
  getAllFriendsOfSelfHandler,
  getAllInvitesOfSelfHandler,
  getCurrentUser,
} from './controllers/user.controller';
import requireUser from './middlewares/requireUser';
import validateResource from './middlewares/validateResource';
import { createSessionSchema } from './schemas/session.schema';
import { createUserSchema } from './schemas/user.schema';

function routes(app: Express) {
  app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

  app.post('/api/users', validateResource(createUserSchema), createUserHandler);

  app.get('/api/me', requireUser, getCurrentUser);

  app.get('/api/me/friends', requireUser, getAllFriendsOfSelfHandler);

  app.get('/api/me/invites', requireUser, getAllInvitesOfSelfHandler);

  app.patch('/api/users/invite', requireUser, addInviteHandler);

  app.patch('/api/users/friend', requireUser, addFriendHandler);

  app.post(
    '/api/sessions',
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get('/api/sessions', requireUser, getUserSessionsHandler);

  app.delete('/api/sessions', requireUser, deleteSessionHandler);
}

export default routes;
