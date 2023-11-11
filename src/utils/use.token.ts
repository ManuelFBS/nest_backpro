import { AuthTokenResult, IUseToken } from '../auth/interfaces/auth.interface';
import * as jwt from 'jsonwebtoken';

export const useToken = (token: string): IUseToken | string => {
  const decode = jwt.decode(token) as AuthTokenResult;
  const currentDate = new Date();
  const expiredDate = new Date(decode.exp);

  try {
    return {
      sub: decode.sub,
      isExpired: +expiredDate <= +currentDate / 1000,
    };
  } catch (error) {
    return 'Token is invalid...!!!';
  }
};
