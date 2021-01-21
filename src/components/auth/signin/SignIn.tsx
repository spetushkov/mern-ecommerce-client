import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { JustifyCenter } from '../../utility/content/JustifyCenter';
import { AuthActions } from '../AuthActions';
import { useAfterAuthenticate } from '../useAfterAuthenticate';

export const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const redirect = useAfterAuthenticate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    dispatch(AuthActions.signIn({ email, password }));
  };

  return (
    <>
      <JustifyCenter>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `${Route.signUp(redirect)}` : Route.signUp()}>Sign Up</Link>
          </Col>
        </Row>
      </JustifyCenter>
    </>
  );
};
