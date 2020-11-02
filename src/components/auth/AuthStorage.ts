import { AuthData } from '../../shared/AuthData';

const AuthStorageKey = {
  AUTH_AUTH_DATA: 'AUTH_AUTH_DATA',
};

const saveAuthData = (authData: AuthData): void => {
  localStorage.setItem(AuthStorageKey.AUTH_AUTH_DATA, JSON.stringify(authData));
};

const removeAuthData = (): void => {
  localStorage.removeItem(AuthStorageKey.AUTH_AUTH_DATA);
};

export const AuthStorage = {
  saveAuthData,
  removeAuthData,
};
