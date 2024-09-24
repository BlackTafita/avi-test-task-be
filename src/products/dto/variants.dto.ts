import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class VariantDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsString()
  options: string[];
}
