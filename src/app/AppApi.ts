import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError;

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type AuthorizationHeader = {
  Authorization: string;
};

const getAuthorizationHeader = (token: string | null): AuthorizationHeader | null => {
  return token ? { Authorization: `Bearer ${token}` } : null;
};

export const AppApi = {
  baseApi,
  getAuthorizationHeader,
};
