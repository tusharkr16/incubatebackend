import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe — strips unknown fields, enforces DTO rules
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // strip fields not in DTO
      forbidNonWhitelisted: true,
      transform: true,        // auto-transform types (string → number etc.)
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // CORS — locked to frontend URL
  app.enableCors({
    origin: process.env.FRONTEND_URL ?? 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix for all REST routes
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 incubateX backend running on http://localhost:${port}/api/v1`);
}

bootstrap();
