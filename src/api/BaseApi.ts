import axios from 'axios';

export const BaseApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
