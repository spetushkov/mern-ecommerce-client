import React from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Route } from '../../../../router/Route';
import { ProductUtils } from '../../ProductUtils';
import { Product } from '../../type/Product';

type Props = {
  productsTopRated: Product[] | null;
};

export const ProductsCarousel = (props: Props): JSX.Element => {
  const { productsTopRated } = props;

  return (
    <>
      <Carousel pause='hover' className='bg-dark'>
        {productsTopRated &&
          productsTopRated.map((product) => (
            <Carousel.Item key={product.id}>
              <Link to={Route.products(product.id)}>
                <Image
                  src={ProductUtils.getProductImageUrl(product.image)}
                  alt={product.name}
                  fluid
                />
                <Carousel.Caption className='carousel-caption'>
                  <h2>
                    {product.name} (${product.price})
                  </h2>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};
