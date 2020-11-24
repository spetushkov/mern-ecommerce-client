import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouterEndpoint } from '../../router/RouterEndpoint';
import { State } from '../../store/Store';

export const useUserAuthenticator = (redirect?: string): void => {
  const history = useHistory();

  const authState = useSelector((state: State) => state.auth);
  const { data: authData } = authState;

  useEffect(() => {
    if (!authData) {
      history.push(RouterEndpoint.signIn(redirect ? redirect : history.location.pathname));
    }
  }, [authData, history, redirect]);
};
