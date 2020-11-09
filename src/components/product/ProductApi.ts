import { AxiosRequestConfig } from 'axios';
import { AppApi } from '../../app/AppApi';
import { PageableResult } from '../../external/PageableResult';
import { Product } from '../../external/Product';
import { Result } from '../../external/Result';

export type ProductApiPageResponse = PageableResult<Product, Error>;
export type ProductApiResponse = Result<Product, Error>;
const baseUrl = '/products';

const findAll = async (token: string | null): Promise<ProductApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.get<ProductApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (id: string): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    const response = await AppApi.baseApi.get<ProductApiResponse>(endpoint);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (entity: Product): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;

    const response = await AppApi.baseApi.post<ProductApiResponse>(endpoint, entity);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (id: string, query: Product): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    const response = await AppApi.baseApi.patch<ProductApiResponse>(endpoint, query);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteById = async (id: string): Promise<void> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    await AppApi.baseApi.delete<ProductApiResponse>(endpoint);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ProductApi = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};
