import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ReduxStore } from '../../store/Redux';

export const StoreProvider: FC = ({ children }) => {
  return <Provider store={ReduxStore}>{children}</Provider>;
};
