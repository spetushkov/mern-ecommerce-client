import { useEffect } from 'react';
import { useAuthenticate } from './useAuthenticate';

export const useSignOut = (signOutHandler: () => void): void => {
  const { getUser, isAuthenticated, getExpiresAtTimeout, isTokenExpired } = useAuthenticate();

  useEffect(() => {
    if ((!isAuthenticated() || isTokenExpired()) && getUser()) {
      signOutHandler();
    }
  }, [isAuthenticated, isTokenExpired, getUser, signOutHandler]);

  useEffect(() => {
    const timeout = getExpiresAtTimeout();
    if (!timeout) {
      return;
    }

    const timer = setTimeout(() => {
      signOutHandler();
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [getExpiresAtTimeout, signOutHandler]);
};
