import React from 'react';
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

export const ProductsItemSkeleton = (): JSX.Element => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Img
        src='/assets/images/placeholders/default-placeholder-image.png'
        variant='top'
        style={{ height: 220 }}
      />

      <Card.Body>
        <Card.Title as='div'>
          <strong>
            <Skeleton />
          </strong>
        </Card.Title>
        <Card.Text as='div'>
          <Skeleton />
        </Card.Text>
        <Card.Text as='h3'>
          <Skeleton />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
