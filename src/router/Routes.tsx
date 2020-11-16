import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { ShippingScreen } from '../screens/ShippingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/signup' component={SignUpScreen} />
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route path='/cart' component={CartScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/order' component={OrderScreen} />
      <Route exact path='/' component={HomeScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};
