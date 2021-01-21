import React from 'react';
import { Loader } from '../utility/loader/Loader';
import './i18nConfig';

type Props = {
  children: React.ReactNode;
};

//  app catches the suspense from page in case translations are not yet loaded
export const I18n = ({ children }: Props): JSX.Element => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
