import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataSourceConfig } from './config/data.source';

@Module({
  imports: [TypeOrmModule.forRoot({ ...DataSourceConfig }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
