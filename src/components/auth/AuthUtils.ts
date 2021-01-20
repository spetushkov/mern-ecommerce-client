import { AuthState } from './AuthReducer';

const getToken = (authState: AuthState): string | null => {
  return authState.data ? authState.data.authToken.token : null;
};

export const AuthUtils = {
  getToken,
};
