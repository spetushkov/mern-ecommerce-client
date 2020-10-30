import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './Store';

type Props = {
  children: React.ReactNode;
};

export const StoreProvider = ({ children }: Props): JSX.Element => {
  return <Provider store={Store}>{children}</Provider>;
};
