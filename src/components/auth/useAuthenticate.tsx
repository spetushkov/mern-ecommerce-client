import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { State } from '../../store/Store';

export const useAuthenticate = (redirect?: string): void => {
  const history = useHistory();

  const authState = useSelector((state: State) => state.auth);
  const { data } = authState;

  const authCookieName = 'Authorization';
  const [cookies] = useCookies([authCookieName]);
  console.log('cookies', cookies[authCookieName]);

  const isUserAuthenticated = (): boolean => !!cookies[authCookieName];
  console.log('isUserAuthenticated', isUserAuthenticated());

  useEffect(() => {
    if (!data) {
      history.push(Route.signIn(redirect ? redirect : history.location.pathname));
    }
  }, [data, history, redirect]);
};
