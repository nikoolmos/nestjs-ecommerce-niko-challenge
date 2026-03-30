import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitMQConfig } from './api/rabbitmq/rabbitmq.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.connectMicroservice(rabbitMQConfig());

  await app.startAllMicroservices();

  await app.listen(3000);
}

bootstrap();
