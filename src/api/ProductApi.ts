import { Product } from '../shared/Product';
import { BaseApi } from './BaseApi';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await BaseApi.get<Product[]>('/products');
  return data;
};
