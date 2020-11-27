import React from 'react';
import { Order } from '../components/order/Order';

export const OrderScreen = (): JSX.Element => {
  return <Order queryByUserId={true} />;
};
