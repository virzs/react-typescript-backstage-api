import { SharedModule } from './shared/shared.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { EnvConfigModule } from './config/env/env.config.module';
import { EnvConfigService } from './config/env/env.config.service';
import { TypeOrmConfigService } from './typeOrm.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      inject: [EnvConfigService],
      useClass: TypeOrmConfigService,
    }),
    UserModule,
    SharedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    //拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorsInterceptor,
    // },
  ],
})
export class AppModule {
  constructor(private readonly: Connection) {}
}
