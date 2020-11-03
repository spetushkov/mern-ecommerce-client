import React from 'react';
import 'reflect-metadata';
import { ErrorHandler } from '../components/ErrorHandler';
import { Body } from '../components/outline/Body';
import { Footer } from '../components/outline/Footer';
import { Header } from '../components/outline/Header';
import { I18nProvider } from '../i18n/I18nProvider';
import { FontAwesome } from '../icon/FontAwesome';
import { Logger } from '../log/Logger';
import { RouterProvider } from '../router/RouterProvider';
import { SkeletonThemeProvider } from '../skeleton/SkeletonThemeProvider';
import { StoreProvider } from '../store/StoreProvider';
import { AppContext } from './AppContext';

try {
  AppContext();
  FontAwesome();
} catch (error) {
  Logger.log(error.message);
}

export const App = (): JSX.Element => {
  return (
    <ErrorHandler>
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
    </ErrorHandler>
  );
};
