import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes } from '../../router/Routes';

export const Body = (): JSX.Element => {
  return (
    <main className='py-3'>
      <Container>
        <Routes />
      </Container>
    </main>
  );
};
