import React, { Suspense } from 'react';
import { Spinner } from '../components/Spinner';
import '../i18n/i18n';

type Props = {
  children: React.ReactNode;
};

// here app catches the suspense from page in case translations are not yet loaded
export const I18nProvider = ({ children }: Props): JSX.Element => {
  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};
