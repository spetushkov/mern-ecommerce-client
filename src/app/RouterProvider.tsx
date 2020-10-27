import React, { FC } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export const RouterProvider: FC = ({ children }) => {
  return <Router>{children}</Router>;
};
