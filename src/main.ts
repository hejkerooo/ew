import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import config from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const builtDocument = new DocumentBuilder()
    .setTitle('Takehome Project')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, builtDocument);

  SwaggerModule.setup('docs', app, document);

  await app.listen(config().port);
}
bootstrap();
