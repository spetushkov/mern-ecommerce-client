import React from 'react';
import { BrowserRouter } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const Router = ({ children }: Props): JSX.Element => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
