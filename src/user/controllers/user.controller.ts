/* El código importa varios módulos y clases desde dependencias externas y archivos locales. */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { PublicAccess } from '../../auth/decorators/public.decorator';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* El decorador `@Post()` se utiliza para definir una ruta HTTP POST en la clase `UserController`.
  Especifica que esta ruta manejará las solicitudes POST al punto final `/user`. */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @PublicAccess()
  @Get()
  async findAll() {
    return await this.userService.findAllUsers();
  }

  @PublicAccess()
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findUser(+id);
  }

  /* El decorador `@Patch(':id')` se utiliza para definir una ruta para manejar solicitudes HTTP PATCH.
  Especifica que esta ruta manejará las solicitudes de PATCH al punto final `/user/:id`, donde `:id`
  es un parámetro dinámico que representa el ID del usuario. */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(+id, updateUserDto);
  }

  /* El código `@Delete(':id') remove(@Param('id') id: string)` define un controlador de ruta para
  manejar solicitudes HTTP DELETE. Especifica que esta ruta manejará las solicitudes DELETE al punto
  final `/user/:id`, donde `:id` es un parámetro dinámico que representa el ID del usuario. */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.removeUser(+id);
  }
}
