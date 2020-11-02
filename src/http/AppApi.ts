import axios, { AxiosError } from 'axios';

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type ApiError = AxiosError;

export const AppApi = {
  baseApi,
};
