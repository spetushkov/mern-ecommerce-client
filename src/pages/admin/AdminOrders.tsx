import React from 'react';
import { Orders } from '../../components/order/orders/Orders';

export const AdminOrders = (): JSX.Element => {
  return <Orders queryByUserId={false} />;
};
