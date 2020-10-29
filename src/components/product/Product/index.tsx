import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Product as ProductModel } from '../../../shared/Product';
import { Rating } from './Rating';

type Props = {
  product: ProductModel;
};

export const Product = (props: Props): JSX.Element => {
  const { product } = props;

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/products/${product.id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/products/${product.id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <Rating product={product} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
