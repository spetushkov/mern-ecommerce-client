import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Index } from '../pages';
import { AdminOrder } from '../pages/admin/AdminOrder';
import { AdminOrders } from '../pages/admin/AdminOrders';
import { AdminProduct } from '../pages/admin/AdminProduct';
import { AdminProductCreate } from '../pages/admin/AdminProductCreate';
import { AdminProducts } from '../pages/admin/AdminProducts';
import { AdminUser } from '../pages/admin/AdminUser';
import { AdminUsers } from '../pages/admin/AdminUsers';
import { SignIn } from '../pages/auth/SignIn';
import { SignUp } from '../pages/auth/SignUp';
import { Cart } from '../pages/cart/Cart';
import { OrderConfirm } from '../pages/cart/OrderConfirm';
import { OrderPaymentMethod } from '../pages/cart/OrderPaymentMethod';
import { OrderShippingAddress } from '../pages/cart/OrderShippingAddress';
import { Order } from '../pages/order/Order';
import { Orders } from '../pages/order/Orders';
import { Product } from '../pages/product/Product';
import { Products } from '../pages/product/Products';
import { NotFound } from '../pages/utility/NotFound';
import { Unauthorized } from '../pages/utility/Unauthorized';

export const Routes = (): JSX.Element => {
  return (
    <Switch>
      <Route exact path='/unauthorized' component={Unauthorized} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/signin' component={SignIn} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/:id' component={Product} />
      <Route exact path='/cart' component={Cart} />
      <Route exact path='/cart/orderShippingAddress' component={OrderShippingAddress} />
      <Route exact path='/cart/orderPaymentMethod' component={OrderPaymentMethod} />
      <Route exact path='/cart/orderConfirm' component={OrderConfirm} />
      <Route exact path='/customer/orders' component={Orders} />
      <Route exact path='/customer/orders/:id' component={Order} />
      <Route exact path='/admin/users' component={AdminUsers} />
      <Route exact path='/admin/users/:id' component={AdminUser} />
      <Route exact path='/admin/orders' component={AdminOrders} />
      <Route exact path='/admin/orders/:id' component={AdminOrder} />
      <Route exact path='/admin/products' component={AdminProducts} />
      <Route exact path='/admin/products/create' component={AdminProductCreate} />
      <Route exact path='/admin/products/:id' component={AdminProduct} />
      <Route exact path='/search/:keyword' component={Index} />
      <Route exact path='/' component={Index} />
      <Route component={NotFound} />
    </Switch>
  );
};
