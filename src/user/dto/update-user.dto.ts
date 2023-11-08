import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @MinLength(2, { message: 'Name must have at least 2 characters...!!!' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'Username must have at least 3 characters...!!!' })
  @IsAlphanumeric(null, {
    message: 'Username does not allow than alpha numeric chars...!!!',
  })
  username: string;

  @IsOptional()
  @IsEmail(null, { message: 'Please provide valid email...!' })
  email: string;

  @IsOptional()
  @IsInt()
  age: number;

  @IsString()
  @IsEnum(['f', 'm'])
  gender: string;

  @IsOptional()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
      at least one uppercase letter, one lowercase letter,
      one number and one special character`,
  })
  password: string;
}
