import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../http/useQuery';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { JustifyCenter } from '../JustifyCenter';
import { AuthActions } from './AuthActions';
import { AuthEndpoint } from './AuthEndpoint';
import { AuthState } from './AuthStore';

type Props = AuthState;

export const SignIn = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const { loading, data, error } = props;
  const authData = data ? data.data : null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = query.get('redirect');

  useEffect(() => {
    if (authData && redirect) {
      history.push(redirect);
    }
  }, [authData, history, redirect]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();

      dispatch(AuthActions.sigIn({ email, password }));
    },
    [dispatch, email, password],
  );

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
            <Link
              to={
                redirect ? `${AuthEndpoint.signUp()}?redirect=${redirect}` : AuthEndpoint.signUp()
              }
            >
              Sign Up
            </Link>
          </Col>
        </Row>
      </JustifyCenter>
    </>
  );
};
