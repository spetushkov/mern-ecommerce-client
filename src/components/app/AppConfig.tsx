import React from 'react';
import 'reflect-metadata';
import { Env } from '../../env/Env';
import { FontAwesome } from '../../font/FontAwesome';

type Props = {
  children: React.ReactNode;
};

export const AppConfig = ({ children }: Props): JSX.Element => {
  Env();
  FontAwesome();

  console.log(`App started in mode ${process.env.REACT_APP_ENV_NAME}`);

  return <>{children}</>;
};
