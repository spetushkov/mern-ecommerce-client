import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CartScreen } from '../screens/CartScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NotFoundScreen } from '../screens/NotFoundScreen';
import { OrderScreen } from '../screens/OrderScreen';
import { OrdersScreen } from '../screens/OrdersScreen';
import { PaymentScreen } from '../screens/PaymentScreen';
import { PlaceOrderScreen } from '../screens/PlaceOrderScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import { ShippingScreen } from '../screens/ShippingScreen';
import { SignInScreen } from '../screens/SignInScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { UserScreen } from '../screens/UserScreen';
import { UsersScreen } from '../screens/UsersScreen';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/signup' component={SignUpScreen} />
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/products' component={ProductsScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route path='/cart' component={CartScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route exact path='/user/orders' render={() => <OrdersScreen queryByUserId={true} />} />
      <Route exact path='/user/orders/:id' render={() => <OrderScreen queryByUserId={true} />} />
      <Route exact path='/admin/users' component={UsersScreen} />
      <Route exact path='/admin/users/:id' component={UserScreen} />
      <Route exact path='/admin/orders' render={() => <OrdersScreen queryByUserId={false} />} />
      <Route exact path='/admin/orders/:id' render={() => <OrderScreen queryByUserId={false} />} />
      <Route exact path='/' component={HomeScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};
