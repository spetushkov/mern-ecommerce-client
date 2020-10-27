import React, { FC } from 'react';
import { Body } from './components/Body';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { RouterProvider } from './components/RouterProvider';
import { StoreProvider } from './components/StoreProvider';
import { AppContext } from './utils/AppContext';

AppContext.config();

export const App: FC = () => {
  return (
    <StoreProvider>
      <RouterProvider>
        <Header />
        <Body />
        <Footer />
      </RouterProvider>
    </StoreProvider>
  );
};
