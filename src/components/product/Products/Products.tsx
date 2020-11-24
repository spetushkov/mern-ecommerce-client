import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { ProductActions } from '../ProductActions';
import { ProductsItem } from './ProductsItem';
import { ProductsSkeleton } from './skeletons/ProductsSkeleton';

export const Products = (): JSX.Element => {
  const dispatch = useDispatch();
  const { t } = useTranslation('Products');

  const productState = useSelector((state: State) => state.product);
  const { loading, data, error } = productState;
  const products = data.products ? data.products.data : null;

  useEffect(() => {
    dispatch(ProductActions.findAll());
  }, [dispatch]);

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <>
      {error && <StoreError error={error} />}
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
