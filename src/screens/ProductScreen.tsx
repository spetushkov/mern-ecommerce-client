import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductActions from '../components/product/Product/Actions';
import { Product2 } from '../components/product/Product/Product2';
import { State } from '../store/Redux';

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

  return <Product2 {...productState} history={history} />;
};
