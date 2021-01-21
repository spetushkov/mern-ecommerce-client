import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { State } from '../../store/Store';
import { User } from '../user/type/User';
import { ApplicationRole } from './type/ApplicationRole';

type ReturnProps = {
  getToken: () => string | undefined;
  getExpiresIn: () => number | undefined;
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

    token = data?.authToken.token;
    if (!token) {
      token = cookies[authCookieName];
    }
    return token;
  };

  const getExpiresIn = (): number | undefined => {
    return data?.authToken.expiresIn;
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
    getExpiresIn,
    isAuthenticated,
    getUser,
    includesRole,
  };
};
