import { Product } from '../shared/Product';
import { AppApi } from './AppApi';

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await AppApi.get<Product[]>('/products');
  return data;
};
