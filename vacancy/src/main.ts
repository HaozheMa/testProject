import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { vacancy_host } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options:{
      host: vacancy_host,
      port: 4040
    }
  })

  const options = new DocumentBuilder()
  .setTitle('Vacancy API')
  .setDescription('a microservice to handle the vacancy data.[some method need authorization]')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3020);
}
bootstrap();
