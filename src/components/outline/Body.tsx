import React from 'react';
import { Container } from 'react-bootstrap';
import { BodyRoutes } from '../../router/BodyRoutes';

export const Body = (): JSX.Element => {
  return (
    <main className='py-3'>
      <Container>
        <BodyRoutes />
      </Container>
    </main>
  );
};
