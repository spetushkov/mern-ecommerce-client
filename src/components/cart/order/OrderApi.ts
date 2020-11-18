import { AxiosRequestConfig } from 'axios';
import { AppApi } from '../../../app/AppApi';
import { PageableResult } from '../../../type/PageableResult';
import { Result } from '../../../type/Result';
import { PayPalPaymentResult } from '../../payPal/PayPalPaymentResult';
import { Order } from './type/Order';

export type OrderApiPageResponse = PageableResult<Order, Error>;
export type OrderApiResponse = Result<Order, Error>;
const baseUrl = '/orders';

const findAll = async (token: string | null): Promise<OrderApiPageResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.get<OrderApiPageResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findById = async (token: string | null, id: string): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.get<OrderApiResponse>(endpoint, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const save = async (token: string | null, entity: Order): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
    };

    const response = await AppApi.baseApi.post<OrderApiResponse>(endpoint, entity, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const pay = async (
  token: string | null,
  id: string,
  query: { paymentResult: PayPalPaymentResult },
): Promise<OrderApiResponse> => {
  try {
    const endpoint = `${baseUrl}/${id}`;
    const config: AxiosRequestConfig = {
      headers: {
        ...AppApi.getAuthorizationHeader(token),
      },
      params: {
        payOrder: true,
      },
    };

    const response = await AppApi.baseApi.patch<OrderApiResponse>(endpoint, query, config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const OrderApi = {
  findAll,
  findById,
  save,
  pay,
};
