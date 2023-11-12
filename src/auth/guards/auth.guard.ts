import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PUBLIC_KEY } from '../../constants/key-decorators';
import { UserService } from '../../user/services/user.service';
import { IUseToken } from '../interfaces/auth.interface';
import { useToken } from 'src/utils/use.token';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );

    // if (isPublic) {
    //   return true;
    // }

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['nest_back'];

    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Invalid token...!!!');
    }

    const manageToken: IUseToken | string = useToken(token);

    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }

    if (manageToken.isExpired) {
      throw new UnauthorizedException('TokenExpired...');
    }

    const { sub } = manageToken;
    const user = await this.userService.findUser(parseInt(sub));

    if (!user) {
      throw new UnauthorizedException('Invalid user...!!!');
    }

    req.idUser = user.id.toString();

    return true;
  }
}
