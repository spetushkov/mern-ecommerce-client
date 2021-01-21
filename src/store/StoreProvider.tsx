import React from 'react';
import { Provider } from 'react-redux';
import { Store as ReduxStore } from './Store';

type Props = {
  children: React.ReactNode;
};

export const Store = ({ children }: Props): JSX.Element => {
  return <Provider store={ReduxStore}>{children}</Provider>;
};
