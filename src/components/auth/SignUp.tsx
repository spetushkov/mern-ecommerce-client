import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../http/useQuery';
import { FormContainer } from '../FormContainer';
import { StateError } from '../StateError';
import { StateLoader } from '../StateLoader';
import { AuthActions } from './AuthActions';
import { AuthEndpoint } from './AuthEndpoint';
import { AuthState } from './AuthStore';

type Props = AuthState;

export const SignUp = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const { loading, data, error } = props;
  const authData = data ? data.data : null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const redirect = query.get('redirect');

  useEffect(() => {
    if (authData && redirect) {
      history.push(redirect);
    }
  }, [authData, history, redirect]);

  const submitHandler = useCallback(
    (e: React.FormEvent<HTMLElement>) => {
      e.preventDefault();

      if (password !== confirmPassword) {
        setMessage('Passwords do not match');
      } else {
        dispatch(AuthActions.signUp({ name, email, password }));
      }
    },
    [dispatch, name, email, password, confirmPassword],
  );

  return (
    <>
      {loading && <StateLoader />}
      {error && <StateError error={error} />}
      <FormContainer>
        {loading && <StateLoader />}
        {error && <StateError error={error} />}
        <h1>Sign Up</h1>
        {message && <Alert variant='danger'>{message}</Alert>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
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
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' variant='primary'>
            Sign Up
          </Button>
        </Form>
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link
              to={
                redirect ? `${AuthEndpoint.signIn()}?redirect=${redirect}` : AuthEndpoint.signIn()
              }
            >
              Sign In
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};
