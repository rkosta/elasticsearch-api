import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './configuration/config';

console.log(config.ElasticSearchUrl)
console.log(config.ElasticSearchApiKey)

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
