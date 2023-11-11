import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../../user/services/user.service';
import { User } from '../../user/entities/user.entity';
import { PayLoadToken } from '../interfaces/auth.interface';

const configService = new ConfigService();

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string) {
    const userByUsername = await this.userService.findBy({
      key: 'username',
      value: username,
    });
    const userByEmail = await this.userService.findBy({
      key: 'email',
      value: username,
    });

    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);
      if (match) return userByUsername;
    }

    if (userByEmail) {
      const match = await bcrypt.compare(password, userByEmail.password);
      if (match) return userByEmail;
    }

    return null;
  }

  public signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: User): Promise<any> {
    const getUser = await this.userService.findUser(user.id);

    const payload: PayLoadToken = {
      sub: getUser.id.toString(),
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: configService.get('JWT_SECRET'),
        expires: '1h',
      }),
      user,
    };
  }
}
