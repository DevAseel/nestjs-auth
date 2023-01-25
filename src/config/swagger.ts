import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tsunagu')
  .setDescription('The Tsunagu API documentation')
  .setVersion('1.0')
  .build();
