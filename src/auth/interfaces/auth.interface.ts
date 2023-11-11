import { User } from '../../user/entities/user.entity';

export interface PayLoadToken {
  sub: string;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface AuthTokenResult {
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  sub: string;
  isExpired: boolean;
}
