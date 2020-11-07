import React from 'react';
import { useSelector } from 'react-redux';
import { SignIn } from '../components/auth/signin/SignIn';
import { State } from '../store/Store';

export const SignInScreen = (): JSX.Element => {
  const authState = useSelector((state: State) => state.auth);

  return <SignIn {...authState} />;
};
