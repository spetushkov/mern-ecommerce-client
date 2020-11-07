import { AppApi } from '../../app/AppApi';
import { AuthData } from '../../external/AuthData';
import { Result } from '../../external/Result';
import { User } from '../../external/User';
import { SignUpForm } from './SignUpForm';

export type AuthApiResponse = Result<AuthData, Error>;
export type SignOutApiResponse = Result<boolean, Error>;

const baseUrl = '/auth';

const AuthApiEndpoint = {
  signUp: (): string => `${baseUrl}/signUp`,
  signIn: (): string => `${baseUrl}/signIn`,
  signOut: (): string => `${baseUrl}/signOut`,
};

const signUp = async (body: SignUpForm): Promise<AuthApiResponse> => {
  try {
    const response = await AppApi.baseApi.post<AuthApiResponse>(AuthApiEndpoint.signUp(), body);
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
