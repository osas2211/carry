import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  // Enable CORS with specific origins, methods, and credentials
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials to be sent with requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed request headers
    exposedHeaders: ['API-Token-Expiry'], //  Specify headers to expose in the response
  });
  await app.listen(port);

  console.log('Listening on port 4000');
}
bootstrap();
