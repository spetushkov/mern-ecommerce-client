import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ProductsItem } from './ProductsItem';
import { ProductsState } from './ProductsStore';
import { ProductsSkeleton } from './skeletons/ProductsSkeleton';

type Props = ProductsState;

export const Products = (props: Props): JSX.Element => {
  // common is a default namespace (1-st element in the array below)
  const { t } = useTranslation(['common', 'validation']);

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
      <h4>common namespace: {t('common:products.header')}</h4>
      <h4>validation namespace: {t('validation:products.header')}</h4>
      <h4>default namespace: {t('products.header')}</h4>
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
