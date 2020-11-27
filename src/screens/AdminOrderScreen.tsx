import React from 'react';
import { Order } from '../components/order/Order';

export const AdminOrderScreen = (): JSX.Element => {
  return <Order queryByUserId={false} />;
};
