import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Endpoint } from '../../router/Endpoint';
import { State } from '../../store/Store';

export const useUserAuthorizer = (redirect?: string): void => {
  const history = useHistory();

  const authState = useSelector((state: State) => state.auth);
  const { data: authData } = authState;

  useEffect(() => {
    if (!authData) {
      history.push(Endpoint.signIn(redirect ? redirect : history.location.pathname));
    }
  }, [authData, history, redirect]);
};
