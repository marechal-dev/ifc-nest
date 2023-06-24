import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import env from '@Configs/env';

import { AppModule } from './app.module';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  if (env.NODE_ENV === 'development') {
    patchNestJsSwagger();

    const config = new DocumentBuilder()
      .setTitle('Assets API')
      .setDescription('The Assets API documentation.')
      .setVersion('1.0')
      .setContact(
        'Pietro Piva Vieira',
        'https://marechal-dev.github.io/linktree/',
        'pietro.developer@gmail.com',
      )
      .addTag('assets')
      .addTag('orders')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}

bootstrap();
