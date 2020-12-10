import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {setup} from "applicationinsights";


async function bootstrap() {

  setup('6d1ea9f9-ec09-4e62-9b4f-39716a605d96').start();

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const options = new DocumentBuilder()
      .setTitle('Management Services')
      .addTag('DDD')
      .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT || '80');
}

bootstrap();