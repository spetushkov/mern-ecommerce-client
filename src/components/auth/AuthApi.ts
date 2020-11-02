import { AxiosInstance } from '../../http/AxiosInstance';
import { AuthData } from '../../shared/AuthData';
import { Result } from '../../shared/Result';
import { User } from '../../shared/User';

export type AuthApiResponse = Result<AuthData, Error>;
export type SignOutApiResponse = Result<boolean, Error>;

const baseUrl = '/auth';

const AuthApiEndpoint = {
  signUp: (): string => `${baseUrl}/signUp`,
  signIn: (): string => `${baseUrl}/signIn`,
  signOut: (): string => `${baseUrl}/signOut`,
};

const signUp = async (user: User): Promise<AuthApiResponse> => {
  try {
    const response = await AxiosInstance.post<AuthApiResponse>(AuthApiEndpoint.signUp(), user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signIn = async (user: Pick<User, 'name' | 'email'>): Promise<AuthApiResponse> => {
  try {
    const response = await AxiosInstance.post<AuthApiResponse>(AuthApiEndpoint.signIn(), user);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const signOut = async (): Promise<SignOutApiResponse> => {
  try {
    const response = await AxiosInstance.get<SignOutApiResponse>(AuthApiEndpoint.signOut());
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
