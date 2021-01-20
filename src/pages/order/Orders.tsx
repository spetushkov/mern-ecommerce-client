import React from 'react';
import { Orders as OrdersComponent } from '../../components/order/orders/Orders';

export const Orders = (): JSX.Element => {
  return <OrdersComponent queryByUserId={true} />;
};
