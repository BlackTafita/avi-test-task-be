import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot(), ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
