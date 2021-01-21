import axios, { AxiosError } from 'axios';

export type ApiError = AxiosError;

type AuthorizationHeader = {
  Authorization: string;
};

export const BASE_URL = process.env.REACT_APP_APP_API_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const getAuthorizationHeader = (token?: string): AuthorizationHeader | null => {
  return token ? { Authorization: `Bearer ${token}` } : null;
};

export const BaseApi = {
  instance,
  getAuthorizationHeader,
};
