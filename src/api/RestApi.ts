import axios from 'axios';
import { Product } from '../domain/Product';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>('/products');
  return data;
};
