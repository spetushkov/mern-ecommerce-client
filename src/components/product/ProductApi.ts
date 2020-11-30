import { AxiosRequestConfig } from 'axios';
import { AppApi } from '../../app/AppApi';
import { PageableResult } from '../../type/PageableResult';
import { Result } from '../../type/Result';
import { Product } from './type/Product';

export type ProductApiPageResponse = PageableResult<Product, Error>;
export type ProductApiResponse = Result<Product, Error>;
export type FileUploadApiResponse = Result<string, Error>;
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

const save = async (token: string | null, entity: Product): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.post<ProductApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (
  token: string | null,
  id: string,
  query: Partial<Product>,
): Promise<ProductApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.patch<ProductApiResponse>(endpoint, query, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteById = async (token: string | null, id: string): Promise<void> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    await AppApi.baseApi.delete<ProductApiResponse>(endpoint, config);
  } catch (error) {
    return Promise.reject(error);
  }
};

const uploadFile = async (
  fieldName: string,
  formData: FormData,
): Promise<FileUploadApiResponse> => {
  try {
    const endpoint = `${baseUrl}/upload/${fieldName}`;
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const response = await AppApi.baseApi.post<FileUploadApiResponse>(endpoint, formData, config);
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
  uploadFile,
};
