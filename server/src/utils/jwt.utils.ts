import jwt from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  if (privateKey) {
    return jwt.sign(object, privateKey, {
      ...(options && options),
      algorithm: 'RS256',
    });
  }
}

export function verifyJwt(token: string) {
  try {
    if (publicKey) {
      const decoded = jwt.verify(token, publicKey);

      return {
        valid: true,
        expired: false,
        decoded,
      };
    } else {
      return {
        valid: false,
        expired: false,
        decoded: null,
      };
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
