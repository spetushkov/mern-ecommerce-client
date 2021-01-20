import React from 'react';
import { Order as OrderComponent } from '../../components/order/Order';

export const Order = (): JSX.Element => {
  return <OrderComponent queryByUserId={true} />;
};
