import { BaseApi } from '../../api/BaseApi';
import { Result } from '../../api/type/Result';
import { User } from '../user/type/User';
import { AuthData } from './type/AuthData';

export type AuthApiResponse = Result<AuthData, Error>;
export type SignOutApiResponse = Result<boolean, Error>;
const baseUrl = '/auth';

const signUp = async (user: User): Promise<AuthApiResponse> => {
  try {
    const endpoint = `${baseUrl}/signUp`;

    const response = await BaseApi.instance.post<AuthApiResponse>(endpoint, user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signIn = async (user: Pick<User, 'email' | 'password'>): Promise<AuthApiResponse> => {
  try {
    const endpoint = `${baseUrl}/signIn`;

    const response = await BaseApi.instance.post<AuthApiResponse>(endpoint, user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signOut = async (): Promise<SignOutApiResponse> => {
  try {
    const endpoint = `${baseUrl}/signOut`;

    const response = await BaseApi.instance.get<SignOutApiResponse>(endpoint);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AuthApi = {
  signUp,
  signIn,
  signOut,
};
