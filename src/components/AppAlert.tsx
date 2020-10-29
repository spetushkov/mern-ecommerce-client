import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  variant: string;
  children: string;
};

export const AppAlert = (props: Props): JSX.Element => {
  const { variant = 'info', children } = props;

  return <Alert variant={variant}>{children}</Alert>;
};
