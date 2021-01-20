import React from 'react';
import { Order } from '../../components/order/Order';

export const AdminOrder = (): JSX.Element => {
  return <Order queryByUserId={false} />;
};
