import { AxiosRequestConfig } from 'axios';
import { BaseApi } from '../../api/BaseApi';
import { PageableResult } from '../../api/type/PageableResult';
import { Result } from '../../api/type/Result';
import { User } from './type/User';

export type UserApiPageResponse = PageableResult<User, Error>;
export type UserApiResponse = Result<User, Error>;
const baseUrl = '/users';

const findAll = async (token?: string): Promise<UserApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.get<UserApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (id: string, token?: string): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.get<UserApiResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// not used, example
const save = async (entity: User, token?: string): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.post<UserApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (
  id: string,
  query: Partial<User>,
  token?: string,
): Promise<UserApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.patch<UserApiResponse>(endpoint, query, config);
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

    await BaseApi.instance.delete<UserApiResponse>(endpoint, config);
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
