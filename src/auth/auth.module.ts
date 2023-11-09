import { Global, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [AuthService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
