import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Form as BSForm, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../http/useQuery';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { Form } from '../form/Form';
import { FormControl } from '../form/FormControl';
import { FormError } from '../form/FormError';
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

  const initialFormState = useMemo(() => new SignUpForm(), []);

  const validateFormHandler = useCallback((values: SignUpForm) => {
    return Form.validate(values, SignUpForm);
  }, []);

  const submitFormHandler = useCallback(
    (values: SignUpForm, actions: FormikHelpers<SignUpForm>) => {
      console.log(JSON.stringify(values));

      // const formState = Form.getState(values, SignUpForm);

      if (values.password !== values.confirmPassword) {
        setFormErrors(['Passwords do not match']);
      } else {
        // dispatch(AuthActions.signUp({ name, email, password }));
      }

      actions.setSubmitting(false);
    },
    [],
  );

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <JustifyCenter>
        <h1>Sign Up</h1>
        <Formik
          initialValues={initialFormState}
          validate={validateFormHandler}
          onSubmit={submitFormHandler}
        >
          {(form) => (
            <>
              {<FormError errors={formErrors} />}
              <BSForm onSubmit={(e: React.FormEvent<HTMLFormElement>) => form.handleSubmit(e)}>
                <FormControl
                  schema={form.values}
                  id='userName'
                  type='text'
                  label='User Name'
                  placeholder='User name'
                />
                <FormControl
                  schema={form.values}
                  id='email'
                  type='email'
                  label='Email Address'
                  placeholder='Email address'
                />
                <FormControl
                  schema={form.values}
                  id='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                />
                <FormControl
                  schema={form.values}
                  id='confirmPassword'
                  type='password'
                  label='Confirm Password'
                  placeholder='Confirm password'
                />
                <Button type='submit' variant='primary' disabled={form.isSubmitting}>
                  Sign Up
                </Button>
              </BSForm>
            </>
          )}
        </Formik>
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
