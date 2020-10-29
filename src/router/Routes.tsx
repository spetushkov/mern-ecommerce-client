import React from 'react';
import { Route } from 'react-router-dom';
import { HomeScreen } from '../screens/HomeScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { _404Screen } from '../screens/_404Screen';

export const Routes = (): JSX.Element => {
  return (
    <>
      <Route path='/signin' component={SignInScreen} />
      <Route path='/products/:id' component={ProductScreen} />
      <Route path='/' component={HomeScreen} exact />
      <Route component={_404Screen} exact />
    </>
  );
};
