import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async validateUser(username: string, password: string) {}
}
