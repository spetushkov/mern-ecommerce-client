import React from 'react';
import { Order } from '../components/order/Order';

type Props = {
  queryByUserId: boolean;
};

export const OrderScreen = (props: Props): JSX.Element => {
  const { queryByUserId } = props;

  return <Order queryByUserId={queryByUserId} />;
};
