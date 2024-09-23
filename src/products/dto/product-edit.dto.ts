import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
