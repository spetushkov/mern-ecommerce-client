import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { _404Screen } from '../screens/_404Screen';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route exact path='/' component={ProductsScreen} />
      <Route component={_404Screen} />
    </Switch>
  );
};
