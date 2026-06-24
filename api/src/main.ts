import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('STEP 1');

  const app = await NestFactory.create(AppModule);

  console.log('STEP 2');

  app.enableCors({
  origin: [
    'http://localhost:5173',
    'https://weather-alert-roan.vercel.app',
  ],
  credentials: true,
});

await app.listen(process.env.PORT || 5000);
}

bootstrap().catch((err) => {
  console.error('BOOTSTRAP ERROR:', err);
});