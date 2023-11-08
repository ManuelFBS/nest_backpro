import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  password: configService.get('DB_PASSWORD'),
  username: configService.get('DB_USERNAME'),
  entities: [User],
  database: configService.get('DB_NAME'),
  synchronize: true,
  logging: false,
};

export const AppDS = new DataSource(DataSourceConfig);
