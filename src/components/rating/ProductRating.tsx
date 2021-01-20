import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { Product } from '../product/type/Product';

type Props = {
  product: Product;
  color?: string;
};

export const ProductRating = (props: Props): JSX.Element => {
  const { product, color = '#f8e825' } = props;
  const { rating, numReviews } = product;
  const text = `${numReviews} reviews`;

  const getIcon = useCallback(
    (rate: number): FontAwesomeIconProps['icon'] => {
      return rating >= rate
        ? ['fas', 'star']
        : rating >= rate - 0.5
        ? ['fas', 'star-half-alt']
        : ['far', 'star'];
    },
    [rating],
  );

  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((rate) => {
        return <FontAwesomeIcon key={rate} icon={getIcon(rate)} color={color} />;
      })}

      <span>{text && text}</span>
    </div>
  );
};
