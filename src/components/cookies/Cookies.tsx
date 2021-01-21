import React from 'react';
import { CookiesProvider } from 'react-cookie';

type Props = {
  children: React.ReactNode;
};

export const Cookies = ({ children }: Props): JSX.Element => {
  return <CookiesProvider>{children}</CookiesProvider>;
};
