import React, { FC } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  variant: string;
  children: string;
};

export const Message: FC<Props> = (props) => {
  const { variant = 'info', children } = props;
  return <Alert variant={variant}>{children}</Alert>;
};
