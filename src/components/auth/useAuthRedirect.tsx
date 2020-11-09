import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthData } from '../../external/AuthData';
import { useQueryParams } from '../../http/useQueryParams';
import { Endpoint } from '../../router/Endpoint';

export const useAuthRedirect = (authData: AuthData | null): string | null => {
  const queryParams = useQueryParams();
  const history = useHistory();

  const redirect = queryParams.get('redirect');

  useEffect(() => {
    if (authData) {
      history.push(redirect ? redirect : Endpoint.home());
    }
  }, [authData, history, redirect]);

  return redirect;
};
