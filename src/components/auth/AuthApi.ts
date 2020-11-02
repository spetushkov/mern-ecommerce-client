import { AuthData } from '../../externalTypes/AuthData';
import { Result } from '../../externalTypes/Result';
import { User } from '../../externalTypes/User';
import { AppApi } from '../../http/AppApi';

export type AuthApiResponse = Result<AuthData, Error>;
export type SignOutApiResponse = Result<boolean, Error>;

const baseUrl = '/auth';

const AuthApiEndpoint = {
  signUp: (): string => `${baseUrl}/signUp`,
  signIn: (): string => `${baseUrl}/signIn`,
  signOut: (): string => `${baseUrl}/signOut`,
};

const signUp = async (user: Omit<User, 'id'>): Promise<AuthApiResponse> => {
  try {
    const response = await AppApi.baseApi.post<AuthApiResponse>(AuthApiEndpoint.signUp(), user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signIn = async (user: Pick<User, 'email' | 'password'>): Promise<AuthApiResponse> => {
  try {
    const response = await AppApi.baseApi.post<AuthApiResponse>(AuthApiEndpoint.signIn(), user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signOut = async (): Promise<SignOutApiResponse> => {
  try {
    const response = await AppApi.baseApi.get<SignOutApiResponse>(AuthApiEndpoint.signOut());
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
