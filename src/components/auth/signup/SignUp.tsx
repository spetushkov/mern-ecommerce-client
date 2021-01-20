import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { JustifyCenter } from '../../utility/content/JustifyCenter';
import { FormControl } from '../../utility/form/FormControl';
import { FormError } from '../../utility/form/FormError';
import { FormUtils } from '../../utility/form/FormUtils';
import { AuthActions } from '../AuthActions';
import { useAfterAuthenticateRedirect } from '../useAfterAuthenticateRedirect';
import { SignUpForm } from './SignUpForm';
import { SignUpFormUtils } from './SignUpFormUtils';

export const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();

  const authState = useSelector((state: State) => state.auth);
  const { loading, data: authData, error } = authState;

  const redirect = useAfterAuthenticateRedirect(authData);

  const [formErrors, setFormErrors] = useState<string[]>([]);

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
            <Link to={redirect ? `${Route.signIn(redirect)}` : Route.signIn()}>Sign In</Link>
          </Col>
        </Row>
      </JustifyCenter>
    </>
  );
};
