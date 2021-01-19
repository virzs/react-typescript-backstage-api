import ArticleModule from './modules/article/article.module'; //文章模块
import { SharedModule } from './shared/shared.module';
import UserModule from './modules/user/user.module'; //用户模块
import { Module } from '@nestjs/common';
import { Connection } from 'typeorm';
import AuthModule from './modules/auth/auth.module'; //授权模块
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import databaseConfig from './config/database.config';
import JWTConfig from './config/JWT.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //配置模块
    ConfigModule.forRoot({
      //env文件路径
      envFilePath: ['.env', 'development.env'],
      //是否忽略env文件
      ignoreEnvFile: false,
      //是否忽略env变量
      ignoreEnvVars: false,
      //是否全局
      isGlobal: true,
      //加载变量
      load: [databaseConfig, JWTConfig],
      //参数校验
      validationSchema: Joi.object({
        //env环境，默认development，非必填
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        //应用端口号，默认3000，非必填
        APP_PORT: Joi.number().default(3000),
        //应用全局路径，默认为空，非必填
        APP_GLOBAL_PATH: Joi.string(),
        //mysql地址，必填
        SQL_HOST: Joi.string().required(),
        //mysql端口号，默认3306，非必填
        SQL_PORT: Joi.number().default(3306),
        //mysql用户名，必填
        SQL_USERNAME: Joi.string().required(),
        //mysql用户密码，必填
        SQL_PASSWORD: Joi.string().required(),
        //mysql数据库名称，必填
        SQL_DATABASE: Joi.string().required(),
        //jwt key，非必填
        JWT_ACCESS_TOKEN_SECRET: Joi.string().default('www.virs.xyz'),
        //jwt过期时间，默认180s，非必填
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().default('180s'),
        //jwt refresh key，非必填
        JWT_REFRESH_TOKEN_SECRET: Joi.string().default('www.virs.xyz'),
        //jwt refresh 过期时间，默认12h，非必填
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().default('12h'),
        //接口文档标题，非必填
        SWAGGER_UI_TITLE: Joi.string().default('接口文档'),
        //接口文档介绍，非必填
        SWAGGER_UI_DESC: Joi.string(),
        //接口文档版本，默认1.0，非必填
        SWAGGER_UI_VERSION: Joi.number().default('1.0'),
        //接口文档服务地址，非必填
        SWAGGER_SERVER_PATH: Joi.string(),
        //接口文档地址，默认doc，非必填
        SWAGGER_GLOBAL_PATH: Joi.string().default('doc'),
      }),
    }),
    //数据库配置
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    SharedModule,
    AuthModule,
    ArticleModule,
  ],
})
export class AppModule {
  constructor(private readonly: Connection) {}
}
