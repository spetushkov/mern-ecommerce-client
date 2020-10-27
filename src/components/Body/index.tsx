import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Routes } from './Routes';

export const Body: FC = () => {
  return (
    <main className='py-3'>
      <Container>
        <Routes />
      </Container>
    </main>
  );
};
