import { AppApi } from '../../app/AppApi';
import { PageableResult } from '../../external/PageableResult';
import { Product } from '../../external/Product';
import { Result } from '../../external/Result';

export type ProductApiPageResponse = PageableResult<Product, Error>;
export type ProductApiResponse = Result<Product, Error>;

const baseUrl = '/products';

const ProductApiEndpoint = {
  base: (): string => `${baseUrl}`,
  byId: (id: string): string => `${baseUrl}/${id}`,
};

const findAll = async (): Promise<ProductApiPageResponse> => {
  try {
    const response = await AppApi.baseApi.get<ProductApiPageResponse>(ProductApiEndpoint.base());
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (id: string): Promise<ProductApiResponse> => {
  try {
    const response = await AppApi.baseApi.get<ProductApiResponse>(ProductApiEndpoint.byId(id));
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (entity: Product): Promise<ProductApiResponse> => {
  try {
    const response = await AppApi.baseApi.post<ProductApiResponse>(
      ProductApiEndpoint.base(),
      entity,
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (id: string, query: Product): Promise<ProductApiResponse> => {
  try {
    const response = await AppApi.baseApi.patch<ProductApiResponse>(
      ProductApiEndpoint.byId(id),
      query,
    );
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const deleteById = async (id: string): Promise<void> => {
  try {
    await AppApi.baseApi.delete<ProductApiResponse>(ProductApiEndpoint.byId(id));
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
