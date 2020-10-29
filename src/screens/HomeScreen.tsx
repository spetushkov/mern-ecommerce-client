import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAll } from '../components/ProductList/Actions';
import { ProductList } from '../components/ProductList/index';
import { State } from '../store/Redux';

export const HomeScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const productList = useSelector((state: State) => state.productList);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  return <ProductList {...productList} />;
};
