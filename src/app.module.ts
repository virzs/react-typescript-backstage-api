import ArticleModule from './modules/article/article.module'; //文章模块
import { SharedModule } from './shared/shared.module';
import UserModule from './modules/user/user.module'; //用户模块
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import AuthModule from './modules/auth/auth.module'; //授权模块
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './modules/database/database.module';
import databaseConfig from './config/database.config';
import JWTConfig from './config/JWT.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', 'development.env'], //env文件路径
      ignoreEnvFile: false, //是否忽略env文件
      ignoreEnvVars: false, //是否忽略env变量
      isGlobal: true, //是否全局
      load: [databaseConfig, JWTConfig], //加载变量
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_PORT: Joi.number()
          .required()
          .default(3000),
        APP_GLOBAL_PATH: Joi.string().required(),
        SQL_HOST: Joi.string().required(),
        SQL_PORT: Joi.number().required(),
        SQL_USERNAME: Joi.string().required(),
        SQL_PASSWORD: Joi.string().required(),
        SQL_DATABASE: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        SWAGGER_UI_TITLE: Joi.string().required(),
        SWAGGER_UI_DESC: Joi.string().required(),
        SWAGGER_UI_VERSION: Joi.number().required(),
        SWAGGER_SERVER_PATH: Joi.string().required(),
        SWAGGER_GLOBAL_PATH: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    UserModule,
    SharedModule,
    AuthModule,
    ArticleModule,
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
