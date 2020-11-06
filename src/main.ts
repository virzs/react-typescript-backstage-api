import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { logger } from './common/middleware/logger.middleware';
import * as express from 'express';
import { TransformInterceptor } from './common/transform/transform.interceptor';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { AllExceptionsFilter } from './common/filters/any-exception.fillter';

async function bootstrap() {
  const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
  const app = await NestFactory.create(AppModule);
  const swaggerOptions = new DocumentBuilder()

    // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
    .setTitle('个人主页API文档') //文档标题
    .setDescription('个人主页API文档') //文档介绍
    .setVersion('1.0') //文档版本
    .addBearerAuth()
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('doc', app, document);
  app.setGlobalPrefix('api');
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  // 监听所有的请求路由，并打印日志
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor()); //全局拦截器
  app.useGlobalFilters(new AllExceptionsFilter()); //过滤其他类型异常
  app.useGlobalFilters(new HttpExceptionFilter()); // 过滤处理 HTTP 异常
  await app.listen(configService.get('APP_PORT') || 3000);
}
bootstrap();
