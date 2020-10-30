import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../components/product/Product/Product';
import { ProductActions } from '../components/product/Product/ProductActions';
import { State } from '../store/Store';

type Props = {
  match: any;
  history: any;
};

export const ProductScreen = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { match, history } = props;
  const { id } = match.params;

  const productState = useSelector((state: State) => state.product);

  useEffect(() => {
    dispatch(ProductActions.findById(id));
  }, [dispatch, id]);

  return <Product {...productState} history={history} />;
};
