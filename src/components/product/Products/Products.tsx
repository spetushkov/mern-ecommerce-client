import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { ProductsActions } from './ProductsActions';
import { ProductsItem } from './ProductsItem';

export const Products = (): JSX.Element => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ProductsActions.findAll());
  }, [dispatch]);

  const productsState = useSelector((state: State) => state.products);
  const { loading, data, error } = productsState;

  const { t } = useTranslation('Products');

  const products = data ? data.data : null;

  return (
    <>
      {loading && <StoreLoader />}
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
