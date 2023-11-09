import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';

/* La clase AuthController maneja las solicitudes de autenticación, incluido el inicio de sesión, y
genera un token web JSON (JWT) para el usuario autenticado. */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  /**
   * La función de inicio de sesión ingresa un nombre de usuario y contraseña, valida al usuario,
   * genera un token JWT y lo devuelve.
   * @param {AuthDTO}  - - `@Body()`: este es un decorador utilizado en algunos marcos (por ejemplo,
   * NestJS) para indicar que el siguiente parámetro debe extraerse del cuerpo de la solicitud.
   * @returns un JSON Web Token (JWT) después de validar las credenciales del usuario y generar el
   * token.
   */
  public async login(@Body() { username, password }: AuthDTO) {
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
