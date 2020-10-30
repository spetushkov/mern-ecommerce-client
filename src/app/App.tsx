import React from 'react';
import { Body } from '../components/outline/Body';
import { Footer } from '../components/outline/Footer';
import { Header } from '../components/outline/Header';
import { I18nProvider } from '../i18n/I18nProvider';
import { RouterProvider } from '../router/RouterProvider';
import { SkeletonThemeProvider } from '../skeleton/SkeletonThemeProvider';
import { StoreProvider } from '../store/StoreProvider';
import { Envalid } from './Envalid';
import { FontAwesome } from './FontAwesome';

Envalid();
FontAwesome();

export const App = (): JSX.Element => {
  return (
    <StoreProvider>
      <RouterProvider>
        <SkeletonThemeProvider>
          <I18nProvider>
            <Header />
            <Body />
            <Footer />
          </I18nProvider>
        </SkeletonThemeProvider>
      </RouterProvider>
    </StoreProvider>
  );
};
