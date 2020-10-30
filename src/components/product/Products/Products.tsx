import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { ProductsItem } from './ProductsItem';
import { ProductsState } from './ProductsStore';
import { ProductsSkeleton } from './skeletons/ProductsSkeleton';

type Props = ProductsState;

export const Products = (props: Props): JSX.Element => {
  const { loading, data, error } = props;
  const products = data ? data.data : null;

  if (loading) {
    return <ProductsSkeleton />;
  }

  if (error) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products &&
          products.map((product) => {
            return (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <ProductsItem product={product} />
              </Col>
            );
          })}
      </Row>
    </>
  );
};
