import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Product } from '../type/Product';

export class ProductForm implements Partial<Product> {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  image = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  description = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  brand = '';

  @Expose()
  @IsString()
  @IsNotEmpty()
  category = '';

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price = 0.0;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  countInStock = 0;
}
