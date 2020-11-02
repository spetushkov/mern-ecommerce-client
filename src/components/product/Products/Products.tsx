import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StateError } from '../../StateError';
import { StateLoader } from '../../StateLoader';
import { ProductsItem } from './ProductsItem';
import { ProductsState } from './ProductsStore';

type Props = ProductsState;

export const Products = (props: Props): JSX.Element => {
  const { t } = useTranslation('Products');

  const { loading, data, error } = props;
  const products = data ? data.data : null;

  return (
    <>
      {loading && <StateLoader />}
      {error && <StateError error={error} />}
      <h4>{t('common:products.header', { namespace: 'common' })}</h4>
      <h4>{t('Products:products.header', { namespace: 'Products' })}</h4>
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
