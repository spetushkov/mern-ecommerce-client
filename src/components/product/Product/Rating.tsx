import React from 'react';
import { Product } from '../../../shared/Product';

type Props = {
  product: Product;
  color?: string;
};

export const Rating = (props: Props): JSX.Element => {
  const { product, color = '#f8e825' } = props;
  const { rating, numReviews } = product;
  const text = `${numReviews} reviews`;

  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((rate) => {
        return (
          <span key={rate}>
            <i
              style={{ color }}
              className={
                rating >= rate
                  ? 'fas fa-star'
                  : rating >= rate - 0.5
                  ? 'fas fa-star-half-alt'
                  : 'far fa-star'
              }
            />
          </span>
        );
      })}
      <span>{text && text}</span>
    </div>
  );
};
