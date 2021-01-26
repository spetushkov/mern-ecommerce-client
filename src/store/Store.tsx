import React from 'react';
import { Provider } from 'react-redux';
import { StoreConfig } from './StoreConfig';

type Props = {
  children: React.ReactNode;
};

export const Store = ({ children }: Props): JSX.Element => {
  return <Provider store={StoreConfig}>{children}</Provider>;
};
