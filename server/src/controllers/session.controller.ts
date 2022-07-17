import { Request, Response } from 'express';
import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import { __isProd__ } from '../utils/isProd';

export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the user's password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // create a session
  const session = await createSession(user._id, req.get('user-agent') || '');

  // create an access token

  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: '15m' }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: '1y' }
  );

  // return access & refresh tokens

  res.cookie('accessToken', accessToken, {
    maxAge: 3.154e10,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: __isProd__ ? true : false,
  });

  res.cookie('refreshToken', refreshToken, {
    maxAge: 3.154e10,
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: __isProd__ ? true : false,
  });

  return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  res.clearCookie('accessToken', {
    sameSite: 'strict',
    secure: __isProd__ ? true : false,
  });
  res.clearCookie('refreshToken', {
    sameSite: 'strict',
    secure: __isProd__ ? true : false,
  });
  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}
