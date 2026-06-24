import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('STEP 1');

  const app = await NestFactory.create(AppModule);

  console.log('STEP 2');

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  console.log('STEP 3');

  await app.listen(5000);

  console.log('STEP 4');
}

bootstrap().catch((err) => {
  console.error('BOOTSTRAP ERROR:', err);
});