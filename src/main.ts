import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
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
  await app.listen(configService.get('APP_PORT') || 3000);
}
bootstrap();
