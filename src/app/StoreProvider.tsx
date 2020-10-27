import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Store } from '../store/Redux';

export const StoreProvider: FC = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};
