import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouterEndpoint } from '../../../router/RouterEndpoint';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { JustifyCenter } from '../../content/JustifyCenter';
import { AuthActions } from '../AuthActions';
import { AuthState } from '../AuthStore';
import { useAuthRedirect } from '../useAuthRedirect';

type Props = AuthState;

export const SignIn = (props: Props): JSX.Element => {
  const { loading, data: authData, error } = props;
  const dispatch = useDispatch();

  const redirect = useAuthRedirect(authData);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    dispatch(AuthActions.signIn({ email, password }));
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
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
            <Link to={redirect ? `${RouterEndpoint.signUp(redirect)}` : RouterEndpoint.signUp()}>
              Sign Up
            </Link>
          </Col>
        </Row>
      </JustifyCenter>
    </>
  );
};
