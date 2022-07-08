import { Request, Response, NextFunction } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../services/session.service';
import { verifyJwt } from '../utils/jwt.utils';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken =
    get(req, 'cookies.accessToken') ||
    get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  const refreshToken =
    get(req, 'cookies.accessToken') || get(req, 'headers.x-refresh');

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie('accessToken', accessToken, {
        maxAge: 900000, //15mins
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,
      });

      res.setHeader('x-access-token', newAccessToken);
    }

    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey');
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};
