import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { State } from '../../store/StoreConfig';
import { User } from '../user/type/User';
import { ApplicationRole } from './type/ApplicationRole';

type ReturnProps = {
  getToken: () => string | undefined;
  isTokenExpired: () => boolean;
  getExpiresAtTimeout: () => number | undefined;
  isAuthenticated: () => boolean;
  getUser: () => User | undefined;
  includesRole: (role: ApplicationRole) => boolean;
};

export const useAuthenticate = (): ReturnProps => {
  const authState = useSelector((state: State) => state.auth);
  const { data } = authState;

  const authCookieName = 'Authorization';
  const [cookies] = useCookies([authCookieName]);

  const getToken = (): string | undefined => {
    let token: string | undefined;

    token = data?.accessToken.token;
    if (!token) {
      token = cookies[authCookieName];
    }
    return token;
  };

  const getExpiresAtTimeout = (): number | undefined => {
    if (!data) {
      return undefined;
    }

    const { expiresAt } = data.accessToken;
    if (!expiresAt) {
      return undefined;
    }

    const dif = new Date(expiresAt).getTime() - new Date().getTime();
    return dif > 0 ? dif : undefined;
  };

  const isTokenExpired = (): boolean => {
    if (!data) {
      return true;
    }

    const { expiresAt } = data.accessToken;
    if (!expiresAt) {
      return false;
    }

    return new Date().getTime() >= new Date(expiresAt).getTime();
  };

  const isAuthenticated = (): boolean => {
    return !!getToken();
  };

  const getUser = (): User | undefined => {
    return data?.user;
  };

  const includesRole = (role: ApplicationRole): boolean => {
    if (!data || !data.user.roles) {
      return false;
    }
    return data.user.roles.includes(role);
  };

  return {
    getToken,
    isTokenExpired,
    getExpiresAtTimeout,
    isAuthenticated,
    getUser,
    includesRole,
  };
};
