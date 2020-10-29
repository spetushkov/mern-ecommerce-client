import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const RouterProvider = ({ children }: Props): JSX.Element => {
  return <Router>{children}</Router>;
};
