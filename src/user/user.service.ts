import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

/* La clase UserService es responsable de crear, recuperar, actualizar y eliminar datos de usuario en
una base de datos. */
@Injectable()
export class UserService {
  /**
   * Aquí, hemos utilizado el enfoque del mapeador de datos para este
   * tutorial, es por eso que inyectamos el repositorio aquí. Otro enfoque
   * puede ser registros activos.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  /**
   * La función de creación toma un objeto CreateUserDto, codifica la contraseña usando bcrypt y guarda
   * al usuario en la base de datos.
   * @param {CreateUserDto} body - El parámetro `body` es de tipo `CreateUserDto`, que es un objeto que
   * contiene los datos necesarios para crear un nuevo usuario.
   * @returns El método `create` devuelve una Promesa que se resuelve en un objeto `Usuario`.
   */
  public async create(body: CreateUserDto): Promise<User> {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      return await this.userRepository.save(body);
    } catch (error) {
      throw error.message;
    }
  }

  /**
   * La función `findAllUsers` devuelve una promesa que se resuelve en una matriz de objetos `User`.
   * @returns El método findAllUsers() devuelve una Promesa que se resuelve en una matriz de objetos de
   * Usuario.
   */
  public async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  /**
   * La función busca un usuario por su ID utilizando el repositorio de usuarios.
   * @param {number} id - El parámetro "id" es un número que representa el identificador único de un
   * usuario.
   * @returns La función findUser devuelve una Promesa que se resuelve en un objeto Usuario.
   */
  public async findUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  /**
   * La función findBy toma un par clave-valor y devuelve un objeto de usuario del repositorio de
   * usuarios según el par clave-valor proporcionado.
   * @param  - El método `findBy` toma un objeto como parámetro con dos propiedades:
   * @returns El método `findBy` devuelve un objeto `User`.
   */
  public async findBy({
    key,
    value,
  }: {
    key: keyof CreateUserDto;
    value: any;
  }) {
    try {
      const user: User = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw error.message;
    }
  }

  /**
   * La función actualiza la información de un usuario y la guarda en la base de datos.
   * @param {number} id - El parámetro "id" es un número que representa el identificador único del
   * usuario que necesita actualizarse.
   * @param {UpdateUserDto} updateUserDto - UpdateUserDto es un objeto de transferencia de datos que
   * contiene la información actualizada de un usuario. Por lo general, incluye propiedades como
   * nombre, edad, correo electrónico, nombre de usuario, contraseña y sexo.
   * @returns El método `updateUser` devuelve una Promesa que se resuelve en el objeto Usuario
   * actualizado después de guardarlo en el repositorio de usuarios.
   */
  public async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user: User = new User();

    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.gender = updateUserDto.gender;
    user.id = id;

    return await this.userRepository.save(user);
  }

  /**
   * La función elimina a un usuario de la base de datos según su ID.
   * @param {number} id - El parámetro "id" es un número que representa el identificador único del
   * usuario que debe eliminarse.
   * @returns una Promesa que se resuelve en un objeto con una propiedad opcional "afectada" de tipo
   * número.
   */
  public async removeUser(id: number): Promise<{ affected?: number }> {
    return await this.userRepository.delete(id);
  }
}
