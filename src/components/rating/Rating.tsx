import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';

type Props = {
  rating: number;
  color?: string;
};

export const Rating = (props: Props): JSX.Element => {
  const { rating, color = '#f8e825' } = props;

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
    </div>
  );
};
