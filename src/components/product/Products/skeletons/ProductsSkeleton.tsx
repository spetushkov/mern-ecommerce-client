import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { ProductsItemSkeleton } from './ProductsItemSkeleton';

export const ProductsSkeleton = (): JSX.Element => {
  const products = Array.of(1, 2, 3, 4, 5, 6);

  return (
    <>
      <h1>
        <Skeleton width={400} />
      </h1>
      <Row>
        {products &&
          products.map((_, index) => {
            return (
              <Col key={index} sm={12} md={6} lg={4} xl={3}>
                <ProductsItemSkeleton />
              </Col>
            );
          })}
      </Row>
    </>
  );
};
