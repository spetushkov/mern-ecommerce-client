import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { State } from '../../store/Store';

export const useAuthorizeAdmin = (redirect?: string): void => {
  const history = useHistory();

  const authState = useSelector((state: State) => state.auth);
  const { data } = authState;

  useEffect(() => {
    if (!(data && data.user.isAdmin)) {
      history.push(Route.unauthorized());
    }
  }, [data, history, redirect]);
};
