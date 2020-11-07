import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

export const BodyRoutes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/signup' component={SignUpScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route exact path='/' component={ProductsScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};
