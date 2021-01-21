import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { useQueryParams } from '../../router/useQueryParams';
import { useAuthenticate } from './useAuthenticate';

export const useAfterAuthenticate = (): string | null => {
  const queryParams = useQueryParams();
  const history = useHistory();
  const { isAuthenticated } = useAuthenticate();

  const redirect = queryParams.get('redirect');

  useEffect(() => {
    if (isAuthenticated()) {
      history.push(redirect ? redirect : Route.home());
    }
  }, [isAuthenticated, history, redirect]);

  return redirect;
};
