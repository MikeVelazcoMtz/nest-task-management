import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config/vars';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(config.PORT);
}
bootstrap();
