import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

/* La clase AuthController maneja las solicitudes de autenticación, incluido el inicio de sesión, y
genera un token web JSON (JWT) para el usuario autenticado. */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /* El decorador `@Post('login')` se utiliza para especificar que este método debe manejar solicitudes
  POST al punto final '/login'. */
  @Post('login')
  public async login(@Body() { username, password }: AuthBody) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );

    if (!userValidate) {
      throw new UnauthorizedException('Data not valid');
    }

    const jwt = await this.authService.generateJWT(userValidate);

    return jwt;
  }
}
