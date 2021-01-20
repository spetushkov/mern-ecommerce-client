import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { useQueryParams } from '../../router/useQueryParams';
import { AuthData } from './type/AuthData';

export const useAfterAuthenticateRedirect = (authData: AuthData | null): string | null => {
  const queryParams = useQueryParams();
  const history = useHistory();

  const redirect = queryParams.get('redirect');

  useEffect(() => {
    if (authData) {
      history.push(redirect ? redirect : Route.home());
    }
  }, [authData, history, redirect]);

  return redirect;
};
