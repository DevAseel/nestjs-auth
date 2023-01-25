import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORSConfig, swaggerConfig } from './config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors(CORSConfig);
  app.setGlobalPrefix('api/v1/');
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerConfig));
  await app.listen(3000);
}
bootstrap();
