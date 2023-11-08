import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
// import { User } from './user/entities/user.entity';
import { DataSourceConfig } from './config/data.source';

// const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: configService.get('DB_HOST'),
    //   port: configService.get('DB_PORT'),
    //   password: configService.get('DB_PASSWORD'),
    //   username: configService.get('DB_USERNAME'),
    //   entities: [User],
    //   database: configService.get('DB_NAME'),
    //   synchronize: true,
    //   logging: false,
    // }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
