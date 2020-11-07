import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Product } from '../components/product/Product';
import { ProductActions } from '../components/product/ProductActions';
import { State } from '../store/Store';

type Params = {
  id: string;
};

export const ProductScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  const productState = useSelector((state: State) => state.product);

  useEffect(() => {
    dispatch(ProductActions.findById(id));
  }, [dispatch, id]);

  return <Product {...productState} />;
};
