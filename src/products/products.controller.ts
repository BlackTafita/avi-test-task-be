import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WixApiService } from '../shared/services/wix-api.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductEditDto } from './dto/product-edit.dto';
import { ProductsService } from './products.service';

@Controller('products')
@ApiTags('Wix-Products')
export class ProductsController {
  constructor(
    private wixService: WixApiService,
    private productService: ProductsService,
  ) {}

  @Get()
  async products(): Promise<any> {
    return this.wixService.queryProducts();
  }

  @Get(':id')
  product(@Param('id') id: string) {
    return this.wixService.getProduct(id);
  }

  @Post()
  create(@Body() body: ProductCreateDto) {
    return this.productService.create(body);
  }

  @Patch(':id')
  update(@Body() body: ProductEditDto, @Param('id') id: string) {
    return this.productService.edit(body, id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(id);
  }
}
