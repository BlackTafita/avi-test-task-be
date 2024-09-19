import { HttpModule, HttpModuleOptions } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WixApiService } from '../shared/services/wix-api.service';
import { SharedModule } from '../shared/shared.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    SharedModule,
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<HttpModuleOptions> => {
        return {
          baseURL: configService.get<string>('WIX_API_URL'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [ProductsService, WixApiService],
  controllers: [ProductsController],
})
export class ProductsModule {}
