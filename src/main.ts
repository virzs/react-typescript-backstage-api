import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const configService = new ConfigService(`${process.env.NODE_ENV}.env`);
  const app = await NestFactory.create(AppModule, {
    logger: new Logger(),
  });
  app.setGlobalPrefix('api');
  await app.listen(configService.get('APP_PORT') || 3000);
}
bootstrap();
