import React from 'react';
import { Orders } from '../components/order/orders/Orders';

type Props = {
  queryByUserId: boolean;
};

export const OrdersScreen = (props: Props): JSX.Element => {
  const { queryByUserId } = props;

  return <Orders queryByUserId={queryByUserId} />;
};
