import React from 'react';
import { Body } from '../components/outline/Body';
import { Footer } from '../components/outline/Footer';
import { Header } from '../components/outline/Header';
import { ExceptionHandler } from '../components/utility/exception/ExceptionHandler';
import { ConfigProvider } from '../config/ConfigProvider';
import { I18nProvider } from '../i18n/I18nProvider';
import { RouterProvider } from '../router/RouterProvider';
import { SkeletonThemeProvider } from '../skeleton/SkeletonThemeProvider';
import { StoreProvider } from '../store/StoreProvider';

export const App = (): JSX.Element => {
  return (
    <ExceptionHandler>
      <ConfigProvider>
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
      </ConfigProvider>
    </ExceptionHandler>
  );
};
