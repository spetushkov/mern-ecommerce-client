import React from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';

type Props = {
  children: React.ReactNode;
};

export const SkeletonThemeProvider = ({ children }: Props): JSX.Element => {
  return <SkeletonTheme>{children}</SkeletonTheme>;
};
