import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config, validateConfig } from './configuration/config';

// console.log(config.ElasticSearchUrl)
// console.log(config.ElasticSearchApiKey)

// validates the configuration before the application runs
// and throws any error that encounters
validateConfig(config)

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
