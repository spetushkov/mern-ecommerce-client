import React from 'react';
import { AppAlert } from '../AppAlert';
import { AppSpinner } from '../AppSpinner';
import { ProductListState } from './Reducer';

type Props = ProductListState;

export const ProductList = (props: Props): JSX.Element => {
  const { loading, data, error } = props;
  const products = data ? data.data : null;

  if (loading) {
    return <AppSpinner />;
  }

  if (error) {
    return <AppAlert variant='danger'>{error.message}</AppAlert>;
  }

  if (!loading && !products) {
    return <AppAlert variant='info'>No data</AppAlert>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      {JSON.stringify(products)}
    </>
  );
};
