import React from 'react';
import { useSelector } from 'react-redux';
import { Cart } from '../components/cart/Cart';
import { State } from '../store/Store';

export const CartScreen = (): JSX.Element => {
  const cartState = useSelector((state: State) => state.cart);

  return <Cart {...cartState} />;
};
