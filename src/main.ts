import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: false,
  });

  const options = new DocumentBuilder()
      .setTitle('Management Services')
      .setDescription('This is a experimental project about how apply DDD architecture to a NestJs project')
      .setVersion('0.8.3')
      .addTag('DDD')
      .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);


  await app.listen(3000/*process.env.PORT || '80'*/);

}
bootstrap();
