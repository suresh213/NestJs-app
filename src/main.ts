import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function app() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Server is running at port ${PORT}`);
}
app();
