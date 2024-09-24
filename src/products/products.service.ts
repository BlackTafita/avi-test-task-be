import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { WixApiService } from '../shared/services/wix-api.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductEditDto } from './dto/product-edit.dto';
import { WixProductData } from './wix-product.interface';

@Injectable()
export class ProductsService {
  constructor(private wixApiService: WixApiService) {}

  async create(dto: ProductCreateDto) {
    const mappedData = this.mapProductToWixProductData(dto);

    try {
      return this.wixApiService.createProduct({
        ...mappedData,
        productType: 'physical',
      });
    } catch (err: any) {
      throw new HttpException(
        `[Wix Api Error] ${err.code} ${err.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async delete(id: string) {
    try {
      return this.wixApiService.deleteProduct(id);
    } catch (err: any) {
      throw new HttpException(
        `[Wix Api Error] ${err.code} ${err.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
  async edit(dto: ProductEditDto, id: string) {
    const mappedData = this.mapProductToWixProductData(dto, id);

    try {
      return this.wixApiService.editProduct(mappedData, id);
    } catch (err: any) {
      throw new HttpException(
        `[Wix Api Error] ${err.code} ${err.message}`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  mapProductToWixProductData(
    dto: ProductEditDto | ProductCreateDto,
    _id?: string,
  ): Partial<WixProductData> {
    return {
      _id: _id ?? _id,
      name: dto.name && dto.name,
      description: dto.description && dto.description,
      priceData: dto.price && { price: dto.price },
      productOptions: dto.variants.map((el) => ({
        name: el.name,
        choices: el.options.map((o) => ({ value: o, description: o })),
      })),
    };
  }
}
