import React from 'react';
import { Loader } from '../components/utility/loader/Loader';
import '../i18n/i18n';

type Props = {
  children: React.ReactNode;
};

//  app catches the suspense from page in case translations are not yet loaded
export const I18nProvider = ({ children }: Props): JSX.Element => {
  return <React.Suspense fallback={<Loader />}>{children}</React.Suspense>;
};
