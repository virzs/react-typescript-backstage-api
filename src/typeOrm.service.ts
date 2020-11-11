import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { EnvConfigService } from './config/env/env.config.service';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: EnvConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get('SQL_HOST'),
      port: Number(this.configService.get('SQL_PORT')) | 3306,
      username: this.configService.get('SQL_USERNAME'),
      password: this.configService.get('SQL_PASSWORD'),
      database: this.configService.get('SQL_DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
