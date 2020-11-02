import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product } from '../../../externalTypes/Product';
import { ProductEndpoint } from '../ProductEndpoint';
import { ProductRating } from '../ProductRating';

type Props = {
  product: Product;
};

export const ProductsItem = (props: Props): JSX.Element => {
  const { product } = props;

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={ProductEndpoint.byId(product.id)}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={ProductEndpoint.byId(product.id)}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <ProductRating product={product} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
