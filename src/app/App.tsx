import React from 'react';
import { Body } from '../components/outline/Body';
import { Footer } from '../components/outline/Footer';
import { Header } from '../components/outline/Header';
import { RouterProvider } from '../router/RouterProvider';
import { StoreProvider } from '../store/StoreProvider';
import { Envalid } from './Envalid';
import { FontAwesome } from './FontAwesome';

FontAwesome();
Envalid();

export const App = (): JSX.Element => {
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
