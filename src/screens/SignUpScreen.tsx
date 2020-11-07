import React from 'react';
import { useSelector } from 'react-redux';
import { SignUp } from '../components/auth/signup/SignUp';
import { State } from '../store/Store';

export const SignUpScreen = (): JSX.Element => {
  const authState = useSelector((state: State) => state.auth);

  return <SignUp {...authState} />;
};
