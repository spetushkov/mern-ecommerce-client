import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { useQueryParams } from '../../../router/useQueryParams';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { Paginator } from '../../utility/content/Paginator';
import { ProductActions } from '../ProductActions';
import { ProductsCarousel } from './carousel/ProductsCarousel';
import { ProductsItem } from './ProductsItem';
import { ProductsSkeleton } from './skeletons/ProductsSkeleton';

type Params = {
  keyword?: string;
};

export const Products = (): JSX.Element => {
  const dispatch = useDispatch();
  const { keyword } = useParams<Params>();
  const queryParams = useQueryParams();
  const { t } = useTranslation('Products');

  const page = queryParams.get('page') ?? undefined;
  const pageLimit = queryParams.get('pageLimit') ?? undefined;

  const productState = useSelector((state: State) => state.product);
  const { loading, data, error } = productState;
  const products = data.products ? data.products.data : null;
  const paginator = data.products ? data.products.paginator : null;
  const { totalPages = 1, currentPage = 1 } = paginator ?? {};
  const productsTopRated = data.productsTopRated ? data.productsTopRated.data : null;

  useEffect(() => {
    dispatch(ProductActions.findAll(keyword, page, pageLimit));
    dispatch(ProductActions.findTopRated());
  }, [dispatch, keyword, page, pageLimit]);

  if (loading) {
    return <ProductsSkeleton />;
  }

  return (
    <>
      <Helmet>
        <title>Welcome to ProShop | Home</title>
        <meta name='description' content='ProShop' />
      </Helmet>
      {error && <StoreError error={error} />}
      <h4>{t('common:products.header', { namespace: 'common' })}</h4>
      <h4>{t('Products:products.header', { namespace: 'Products' })}</h4>
      {!keyword && <ProductsCarousel productsTopRated={productsTopRated} />}
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
      <Paginator
        endpoint={Route.products()}
        pageLimit={Number(pageLimit)}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </>
  );
};
