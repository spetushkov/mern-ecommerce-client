import { AxiosRequestConfig } from 'axios';
import { BaseApi } from '../../api/BaseApi';
import { PageableResult } from '../../api/type/PageableResult';
import { Result } from '../../api/type/Result';
import { PayPalPaymentResult } from '../payPal/type/PayPalPaymentResult';
import { Order } from './type/Order';

export type OrderApiPageResponse = PageableResult<Order, Error>;
export type OrderApiResponse = Result<Order, Error>;
const baseUrl = '/orders';

const findAll = async (queryByUserId: boolean, token?: string): Promise<OrderApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
      params: {
        byUserId: queryByUserId,
      },
    };

    const response = await BaseApi.instance.get<OrderApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (
  id: string,
  queryByUserId: boolean,
  token?: string,
): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
      params: {
        byUserId: queryByUserId,
      },
    };

    const response = await BaseApi.instance.get<OrderApiResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (entity: Order, token?: string): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.post<OrderApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const updateById = async (
  id: string,
  query: Partial<Order>,
  token?: string,
): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
    };

    const response = await BaseApi.instance.patch<OrderApiResponse>(endpoint, query, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const pay = async (
  id: string,
  query: { paymentResult: PayPalPaymentResult },
  token?: string,
): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...BaseApi.getAuthorizationHeader(token),
      },
      params: {
        payOrder: true,
      },
    };

    const response = await BaseApi.instance.patch<OrderApiResponse>(endpoint, query, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const OrderApi = {
  findAll,
  findById,
  save,
  updateById,
  pay,
};
