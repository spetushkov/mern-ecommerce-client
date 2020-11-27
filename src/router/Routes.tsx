import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AdminOrderScreen } from '../screens/AdminOrderScreen';
import { AdminOrdersScreen } from '../screens/AdminOrdersScreen';
import { AdminProductCreateScreen } from '../screens/AdminProductCreateScreen';
import { AdminProductScreen } from '../screens/AdminProductScreen';
import { AdminProductsScreen } from '../screens/AdminProductsScreen';
import { AdminUserScreen } from '../screens/AdminUserScreen';
import { AdminUsersScreen } from '../screens/AdminUsersScreen';
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
import { UnauthorizedScreen } from '../screens/UnauthorizedScreen';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/unauthorized' component={UnauthorizedScreen} />
      <Route exact path='/signup' component={SignUpScreen} />
      <Route exact path='/signin' component={SignInScreen} />
      <Route exact path='/products' component={ProductsScreen} />
      <Route exact path='/products/:id' component={ProductScreen} />
      <Route path='/cart' component={CartScreen} />
      <Route path='/shipping' component={ShippingScreen} />
      <Route path='/payment' component={PaymentScreen} />
      <Route path='/placeorder' component={PlaceOrderScreen} />
      <Route exact path='/user/orders' component={OrdersScreen} />
      <Route exact path='/user/orders/:id' component={OrderScreen} />
      <Route exact path='/admin/users' component={AdminUsersScreen} />
      <Route exact path='/admin/users/:id' component={AdminUserScreen} />
      <Route exact path='/admin/orders' component={AdminOrdersScreen} />
      <Route exact path='/admin/orders/:id' component={AdminOrderScreen} />
      <Route exact path='/admin/products' component={AdminProductsScreen} />
      <Route exact path='/admin/products/create' component={AdminProductCreateScreen} />
      <Route exact path='/admin/products/:id' component={AdminProductScreen} />
      <Route exact path='/' component={HomeScreen} />
      <Route component={NotFoundScreen} />
    </Switch>
  );
};
