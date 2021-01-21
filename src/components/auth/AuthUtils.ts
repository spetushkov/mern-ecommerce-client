import { BooleanUtils } from '../../utils/BooleanUtils';
import { AuthState } from './AuthReducer';

const getToken = (authState: AuthState): string | undefined => {
  return authState.data ? authState.data.authToken.token : undefined;
};

const isCookiesStorage = (): boolean =>
  BooleanUtils.fromString(process.env.REACT_APP_AUTH_STORAGE_COOKIES ?? 'false');

export const AuthUtils = {
  getToken,
  isCookiesStorage,
};
