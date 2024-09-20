import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { ConstantService } from './constants/constant.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const keys = app.get(ConstantService);

  const config = new DocumentBuilder()
    .setTitle('Transaction API')
    .setDescription('API for managing user transactions and authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(keys.port, () => {
    Logger.log(`
      #################################################
        🛡  ${keys.appName} API is running! Access URLs:
        🏠 HomePage:      ${keys.appUrl}
        📄 Swagger Docs: ${keys.appUrl}/api-docs
        #################################################
      `);
  });
}
bootstrap();
