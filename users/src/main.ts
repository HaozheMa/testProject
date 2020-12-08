import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';
import { users_host } from './config';
import { RolesGuard } from './user/guards/RolesGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options:{
      host: users_host,
      port: 4010
    }
  })

  const options = new DocumentBuilder()
  .setTitle('Users API')
  .setDescription('a microservice to handle the users data.[some method need authorization]')
  .setVersion('1.0')
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  
  app.startAllMicroservicesAsync();
  await app.listen(3010);
}
bootstrap();
