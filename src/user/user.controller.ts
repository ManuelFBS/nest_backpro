/* El código importa varios módulos y clases desde dependencias externas y archivos locales. */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/* La clase UserController define rutas para manejar operaciones CRUD en entidades de usuario. */
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* El decorador `@Post()` se utiliza para definir una ruta HTTP POST en la clase `UserController`.
  Especifica que esta ruta manejará las solicitudes POST al punto final `/user`. */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  /* El decorador `@Get()` se utiliza para definir una ruta HTTP GET en la clase `UserController`.
  Especifica que esta ruta manejará las solicitudes GET al punto final `/user`. */
  @Get()
  async findAll() {
    return await this.userService.findAllUsers();
  }

  /* El fragmento de código `@Get(':id')` es un decorador que se utiliza para definir una ruta para
  manejar solicitudes HTTP GET. Especifica que esta ruta manejará solicitudes GET al punto final
  `/user/:id`, donde `:id` es un parámetro dinámico que representa el ID del usuario. */
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
