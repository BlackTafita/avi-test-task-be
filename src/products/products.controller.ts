import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WixApiService } from '../shared/services/wix-api.service';

@Controller('products')
@ApiTags('Wix-Products')
export class ProductsController {
  constructor(private wixService: WixApiService) {}

  @Get()
  products() {
    return this.wixService.queryProducts();
  }
}
