import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { ApplicationRole } from './type/ApplicationRole';
import { useAuthenticate } from './useAuthenticate';

export const useRequireAuthorize = (role: ApplicationRole, redirect?: string): void => {
  const history = useHistory();
  const { isAuthenticated, includesRole } = useAuthenticate();

  useEffect(() => {
    if (!(isAuthenticated() && includesRole(role))) {
      history.push(Route.unauthorized());
    }
  }, [isAuthenticated, includesRole, history, redirect, role]);
};
