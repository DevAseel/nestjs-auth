import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORSConfig } from './config';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.use(helmet());
  app.enableCors(CORSConfig);
  app.setGlobalPrefix('api/v1/');
  await app.listen(3000);
}
bootstrap();
