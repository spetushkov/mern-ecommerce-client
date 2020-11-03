import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { ProductsItem } from './ProductsItem';
import { ProductsState } from './ProductsStore';

type Props = ProductsState;

export const Products = (props: Props): JSX.Element => {
  const { t } = useTranslation('Products');

  const { loading, data, error } = props;
  const products = data ? data.data : null;

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <h4>{t('common:products.header', { namespace: 'common' })}</h4>
      <h4>{t('Products:products.header', { namespace: 'Products!' })}</h4>
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
