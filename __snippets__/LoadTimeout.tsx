import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

export const ProductsScreen = (): JSX.Element => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // dispatch(ProductsActions.findAll());
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return <div>{loading}</div>;
};
