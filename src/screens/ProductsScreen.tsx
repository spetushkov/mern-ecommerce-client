import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductsActions from '../components/product/Products/Actions';
import { Products } from '../components/product/Products/index';
import { State } from '../store/Redux';

export const ProductsScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const productsState = useSelector((state: State) => state.products);

  useEffect(() => {
    dispatch(ProductsActions.findAll());
  }, [dispatch]);

  return <Products {...productsState} />;
};
