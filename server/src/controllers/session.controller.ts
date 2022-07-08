import { Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import config from 'config';

export async function createSessionHandler(req: Request, res: Response) {
  //validate the users password
  const { email, password } = req.body;
  const user = await validatePassword(email, password);
  if (!user) {
    return res.status(401).send('invalid email or password');
  }
  //create a session
  const session = await createSession(user._id);
  //create an access token
  const accessToken = signJwt(
    {
      ...user,
      session,
    },
    'accessTokenPrivateKey',
    {
      expiresIn: config.get('accessTokenTtl'), //15mins
    }
  );
  //create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session,
    },
    'refreshTokenPrivateKey',
    {
      expiresIn: config.get('refreshTokenTtl'), //1year
    }
  );
  //return access & refresh token
  res.status(201).send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
