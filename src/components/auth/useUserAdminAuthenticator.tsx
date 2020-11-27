import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouterEndpoint } from '../../router/RouterEndpoint';
import { State } from '../../store/Store';

export const useUserAdminAuthenticator = (redirect?: string): void => {
  const history = useHistory();

  const authState = useSelector((state: State) => state.auth);
  const { data } = authState;

  useEffect(() => {
    if (!(data && data.user.isAdmin)) {
      history.push(RouterEndpoint.unauthorized());
    }
  }, [data, history, redirect]);
};
