import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ConfigService} from "@nestjs/config";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const configService = await app.get<ConfigService>(ConfigService)
    app.enableCors({
        origin: configService.get('FRONTEND_URL'),
        methods: 'GET, PUT, POST, DELETE',
        allowedHeaders: 'Content-Type, Authorization'
    })
    console.log(configService.get('FRONTEND_URL'))
    const port = configService.get<number>('PORT')
    await app.listen(port || 3000);
    console.log(`Server started on PORT=${port}`)
}

bootstrap();
