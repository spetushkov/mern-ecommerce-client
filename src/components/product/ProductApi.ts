import { AxiosRequestConfig } from 'axios';
import { BaseApi } from '../../api/BaseApi';
import { PageableResult } from '../../api/type/PageableResult';
import { Result } from '../../api/type/Result';
import { File } from '../file/type/File';
import { Product } from './type/Product';

export type ProductApiPageResponse = PageableResult<Product, Error>;
export type ProductApiResponse = Result<Product, Error>;
export type FileApiResponse = Result<File, Error>;
const baseUrl = '/products';

const findAll = async (
  keyword?: string,
  page?: string,
  pageLimit?: string,
  sort?: string,
): Promise<ProductApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      params: {
        keyword: keyword ?? null,
        page: page ?? null,
        pageLimit: pageLimit ?? null,
        sort: sort ?? null,
      },
    };

    const response = await BaseApi.instance.get<ProductApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (id: string): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    const response = await BaseApi.instance.get<ProductApiResponse>(endpoint);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (entity: Product, token?: string): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.post<ProductApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (
  id: string,
  query: Partial<Product>,
  token?: string,
): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.patch<ProductApiResponse>(endpoint, query, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteById = async (id: string, token?: string): Promise<void> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    await BaseApi.instance.delete<ProductApiResponse>(endpoint, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

const uploadImage = async (fieldName: string, formData: FormData): Promise<FileApiResponse> => {
  try {
    const endpoint = `${baseUrl}/upload?field=${fieldName}&imageFileType=true`;
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await BaseApi.instance.post<FileApiResponse>(endpoint, formData, config);
    return Promise.resolve(response.data);
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
  uploadImage,
};
