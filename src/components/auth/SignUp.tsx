import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '../../http/useQuery';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { FormControl } from '../form/FormControl';
import { FormError } from '../form/FormError';
import { FormUtils } from '../form/FormUtils';
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

  const validateFormHandler = async (values: SignUpForm): Promise<FormikErrors<SignUpForm>> => {
    try {
      const result = await FormUtils.validate(values, SignUpForm);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const submitFormHandler = (values: SignUpForm, actions: FormikHelpers<SignUpForm>): void => {
    console.log(JSON.stringify(values));

    // const formState = Form.getState(values, SignUpForm);

    if (values.password !== values.confirmPassword) {
      setFormErrors(['Passwords do not match']);
    } else {
      // dispatch(AuthActions.signUp({ name, email, password }));
    }

    actions.setSubmitting(false);
  };

  const isFormValid = (form: FormikProps<SignUpForm>): boolean => {
    // const result = form.isSubmitting;
    return true;
  };

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
              <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => form.handleSubmit(e)}>
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
                <Button type='submit' variant='primary' disabled={!isFormValid(form)}>
                  Sign Up
                </Button>
              </Form>
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
