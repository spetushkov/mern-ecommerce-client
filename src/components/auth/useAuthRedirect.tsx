import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueryParams } from '../../http/useQueryParams';
import { RouterEndpoint } from '../../router/RouterEndpoint';
import { AuthData } from './type/AuthData';

export const useAuthRedirect = (authData: AuthData | null): string | null => {
  const queryParams = useQueryParams();
  const history = useHistory();

  const redirect = queryParams.get('redirect');

  useEffect(() => {
    if (authData) {
      history.push(redirect ? redirect : RouterEndpoint.home());
    }
  }, [authData, history, redirect]);

  return redirect;
};