import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { VariantDto } from './variants.dto';

export class ProductEditDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsArray()
  variants: VariantDto[];
}
