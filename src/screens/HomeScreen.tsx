import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';
import { getProducts } from '../components/ProductList/Actions';
import { State } from '../store/Redux';

export const HomeScreen: FC = () => {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector((state: State) => state.productList);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant='danger'>{error.message}</Message>;
  }

  if (!data) {
    return <Message variant='info'>No data</Message>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      {JSON.stringify(data.length)}
    </>
  );
};
