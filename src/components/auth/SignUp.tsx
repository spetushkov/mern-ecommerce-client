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
import { AuthActions } from './AuthActions';
import { AuthEndpoint } from './AuthEndpoint';
import { AuthState } from './AuthStore';
import { SignUpForm } from './SignUpForm';
import { SignUpFormUtils } from './SignUpFormUtils';

type Props = AuthState;

export const SignUp = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();

  const { loading, data: authData, error } = props;

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

  const isFormSubmittable = (form: FormikProps<SignUpForm>) => {
    return FormUtils.isSubmittable(form);
  };

  const submitFormHandler = async (
    values: SignUpForm,
    FormActions: FormikHelpers<SignUpForm>,
  ): Promise<void> => {
    const formState = FormUtils.getState(values, SignUpForm);

    if (formState.password !== formState.confirmPassword) {
      setFormErrors(['Passwords do not match']);
    } else {
      dispatch(AuthActions.signUp(formState));
    }

    FormActions.setSubmitting(false);
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
              <Form
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => form.handleSubmit(e)}
                noValidate
              >
                <FormControl
                  schema={form.values}
                  id='name'
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
                  helpText={SignUpFormUtils.passwordMinLength('6')}
                  instantFeedback={true}
                />
                <FormControl
                  schema={form.values}
                  id='confirmPassword'
                  type='password'
                  label='Confirm Password'
                  placeholder='Confirm password'
                />
                <Button type='submit' variant='primary' disabled={!isFormSubmittable(form)}>
                  {form.isSubmitting ? 'Sign Up...' : 'Sign Up'}
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
