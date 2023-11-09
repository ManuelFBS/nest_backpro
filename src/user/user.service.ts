import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

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

  public async create(body: CreateUserDto): Promise<User> {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      return await this.userRepository.save(body);
    } catch (error) {
      throw error.message;
    }
  }

  public async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async findUser(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

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

  public async removeUser(id: number): Promise<{ affected?: number }> {
    return await this.userRepository.delete(id);
  }
}
