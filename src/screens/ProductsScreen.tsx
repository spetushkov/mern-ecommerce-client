import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Products } from '../components/product/products/Products';
import { ProductsActions } from '../components/product/products/ProductsActions';
import { State } from '../store/Store';

export const ProductsScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const productsState = useSelector((state: State) => state.products);

  useEffect(() => {
    dispatch(ProductsActions.findAll());
  }, [dispatch]);

  return <Products {...productsState} />;
};
