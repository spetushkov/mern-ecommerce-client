import React from 'react';
import { Route } from 'react-router-dom';
import { HomeScreen } from '../../screens/HomeScreen';
import { SignInScreen } from '../../screens/SignInScreen';

export const Routes = (): JSX.Element => {
  return (
    <>
      <Route path='/signin' component={SignInScreen} />
      <Route path='/' component={HomeScreen} exact />
    </>
  );
};
