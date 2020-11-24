import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from '../../store/Store';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { useUserAuthenticator } from '../auth/useUserAuthenticator';
import { UserActions } from './UserActions';

type Params = {
  id: string;
};

export const User = (): JSX.Element => {
  useUserAuthenticator();

  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  const userState = useSelector((state: State) => state.user);
  const { loading, data, error } = userState;
  const user = data.user;

  useEffect(() => {
    dispatch(UserActions.findById(id));
  }, [dispatch, id]);

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <h2>User {user && user.id}</h2>
    </>
  );
};
