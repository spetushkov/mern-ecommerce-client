import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AppAlert } from '../../AppAlert';
import { AppSpinner } from '../../AppSpinner';
import { Product } from '../Product';
import { ProductsState } from './Reducer';

type Props = ProductsState;

export const Products = (props: Props): JSX.Element => {
  const { loading, data, error } = props;
  const products = data ? data.data : null;

  if (loading) {
    return <AppSpinner />;
  }

  if (error) {
    return <AppAlert variant='danger'>{error.message}</AppAlert>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products &&
          products.map((product) => {
            return (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};
