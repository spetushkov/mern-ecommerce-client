import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomeScreen } from '../screens/HomeScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/signup' component={SignUpScreen} />
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route exact path='/' component={HomeScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};
