import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { useAuthenticate } from './useAuthenticate';

export const useRequireAuthenticate = (redirect?: string): void => {
  const history = useHistory();
  const { isAuthenticated } = useAuthenticate();

  useEffect(() => {
    if (!isAuthenticated()) {
      history.push(Route.signIn(redirect ? redirect : history.location.pathname));
    }
  }, [isAuthenticated, history, redirect]);
};
