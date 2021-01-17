import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.fillter';
import { AllExceptionsFilter } from './common/filters/any-exception.fillter';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DefaultDTOValidationPipe } from './common/pipes/defaultDTOValidation.pipe';
import { Logger } from './utils/log4';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envConfigService = app.get(ConfigService);
  const swaggerOptions = new DocumentBuilder()
    // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
    .setTitle(envConfigService.get('SWAGGER_UI_TITLE')) //文档标题
    .setDescription(envConfigService.get('SWAGGER_UI_DESC')) //文档介绍
    .setVersion(envConfigService.get('SWAGGER_UI_VERSION')) //文档版本
    .addServer(envConfigService.get('SWAGGER_SERVER_PATH')) //配置服务，默认路径api
    .addBearerAuth() //设置token
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup(
    envConfigService.get('SWAGGER_GLOBAL_PATH'),
    app,
    document,
  );
  app.setGlobalPrefix(envConfigService.get('APP_GLOBAL_PATH')); //全局路径
  app.use(cookieParser());
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger); //使用日志
  app.useGlobalPipes(new DefaultDTOValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter()); //过滤其他类型异常
  app.useGlobalFilters(new HttpExceptionFilter()); // 过滤处理 HTTP 异常
  await app.listen(envConfigService.get('APP_PORT') || 3000);

  Logger.info(
    `http://localhost:${envConfigService.get('APP_PORT')}`,
    '服务启动成功',
  );
}
bootstrap();
