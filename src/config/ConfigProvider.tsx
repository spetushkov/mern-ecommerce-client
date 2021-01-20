import React from 'react';
import 'reflect-metadata';
import { FontAwesome } from '../font/FontAwesome';
import { Env } from './Env';

type Props = {
  children: React.ReactNode;
};

export const ConfigProvider = ({ children }: Props): JSX.Element => {
  Env();
  FontAwesome();

  console.log(`App started in mode ${process.env.REACT_APP_ENV_NAME}`);

  return <>{children}</>;
};
