import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import { HomeScreen } from '../../screens/HomeScreen';
import { SignInScreen } from '../../screens/SignInScreen';

export const Body: FC = () => {
  return (
    <main className='py-3'>
      <Container>
        <Route path='/signin' component={SignInScreen} />
        <Route path='/' component={HomeScreen} exact />
      </Container>
    </main>
  );
};
