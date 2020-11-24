import { AxiosRequestConfig } from 'axios';
import { AppApi } from '../../app/AppApi';
import { PageableResult } from '../../type/PageableResult';
import { Result } from '../../type/Result';
import { User } from './type/User';

export type UserApiPageResponse = PageableResult<User, Error>;
export type UserApiResponse = Result<User, Error>;
const baseUrl = '/users';

const findAll = async (token: string | null): Promise<UserApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.get<UserApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (token: string | null, id: string): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.get<UserApiResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// not used, example
const save = async (entity: User): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;

    const response = await AppApi.baseApi.post<UserApiResponse>(endpoint, entity);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// not used, example
const updateById = async (id: string, query: User): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    const response = await AppApi.baseApi.patch<UserApiResponse>(endpoint, query);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// not used, example
const deleteById = async (id: string): Promise<void> => {
  try {
    const endpoint = `${baseUrl}/${id}`;

    await AppApi.baseApi.delete<UserApiResponse>(endpoint);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UserApi = {
  findAll,
  findById,
  save,
  updateById,
  deleteById,
};
