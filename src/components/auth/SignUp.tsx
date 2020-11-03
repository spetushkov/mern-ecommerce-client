import { FormikHelpers, useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../http/useQuery';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { FormControl } from '../form/FormControl';
import { FormControlError } from '../form/FormControlError';
import { FormError } from '../form/FormError';
import { validateForm } from '../form/validateForm';
import { JustifyCenter } from '../JustifyCenter';
import { AuthEndpoint } from './AuthEndpoint';
import { AuthState } from './AuthStore';
import { SignUpForm } from './SignUpForm';

type Props = AuthState;

export const SignUp = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const { loading, data, error } = props;
  const authData = data ? data.data : null;

  const redirect = query.get('redirect');

  useEffect(() => {
    if (authData && redirect) {
      history.push(redirect);
    }
  }, [authData, history, redirect]);

  const [formErrors, setFormErrors] = useState([] as string[]);

  const submitFormHandler = useCallback(
    (values: SignUpForm, actions: FormikHelpers<SignUpForm>): void => {
      console.log(JSON.stringify(values));
      actions.setSubmitting(false);

      if (values.password !== values.confirmPassword) {
        setFormErrors(['Passwords do not match']);
      } else {
        // dispatch(AuthActions.signUp({ name, email, password }));
      }
    },
    [],
  );

  const initialFormState = useMemo(() => new SignUpForm(), []);

  const signUpForm = useFormik<SignUpForm>({
    initialValues: initialFormState,
    validate: (values) => validateForm(values, SignUpForm),
    onSubmit: submitFormHandler,
  });

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <JustifyCenter>
        <h1>Sign Up</h1>
        {<FormError errors={formErrors} />}
        <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => signUpForm.handleSubmit(e)}>
          <FormControl
            form={signUpForm}
            controlId='userName'
            type='text'
            label='User Name'
            placeholder='Enter user name'
          />
          {/* <Form.Group controlId='userName'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              name='userName'
              type='text'
              placeholder='Enter user name'
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.userName}
            />
            <FormControlError form={signUpForm} controlId='userName' />
          </Form.Group> */}
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Enter email'
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.email}
            />
            <FormControlError form={signUpForm} controlId='email' />
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Enter password'
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.password}
            />
            <FormControlError form={signUpForm} controlId='password' />
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='confirmPassword'
              type='password'
              placeholder='Confirm password'
              onChange={signUpForm.handleChange}
              onBlur={signUpForm.handleBlur}
              value={signUpForm.values.confirmPassword}
            />
            <FormControlError form={signUpForm} controlId='confirmPassword' />
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
      </JustifyCenter>
    </>
  );
};
