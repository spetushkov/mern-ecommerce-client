import axios from 'axios';

export const AppApi = axios.create({
  baseURL: process.env.REACT_APP_APP_API_URL,
});
