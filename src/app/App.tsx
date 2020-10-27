import React, { FC } from 'react';
import { Body } from '../components/Body';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { AppContext } from './AppContext';
import { RouterProvider } from './RouterProvider';
import { StoreProvider } from './StoreProvider';

AppContext();

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
