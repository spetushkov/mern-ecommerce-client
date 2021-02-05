import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import React, { useMemo, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { JustifyCenter } from '../../utility/content/JustifyCenter';
import { FormError } from '../../utility/form/FormError';
import { FormItem } from '../../utility/form/FormItem';
import { FormUtils } from '../../utility/form/FormUtils';
import { AuthActions } from '../AuthActions';
import { useAfterAuthenticate } from '../useAfterAuthenticate';
import { SignUpFormEntity } from './SignUpFormEntity';
import { SignUpFormUtils } from './SignUpFormUtils';

export const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const redirect = useAfterAuthenticate();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const initialFormState = useMemo(() => new SignUpFormEntity(), []);

  const validateFormHandler = async (
    values: SignUpFormEntity,
  ): Promise<FormikErrors<SignUpFormEntity>> => {
    try {
      const result = await FormUtils.validate(values, SignUpFormEntity);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const isFormSubmittable = (form: FormikProps<SignUpFormEntity>): boolean => {
    return FormUtils.isSubmittable(form);
  };

  const submitFormHandler = async (
    values: SignUpFormEntity,
    FormActions: FormikHelpers<SignUpFormEntity>,
  ): Promise<void> => {
    const formState = FormUtils.getState(values, SignUpFormEntity);

    if (formState.password !== formState.confirmPassword) {
      setFormErrors(['Passwords do not match']);
    } else {
      dispatch(AuthActions.signUp(formState));
    }

    FormActions.setSubmitting(false);
  };

  return (
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
              <FormItem
                schema={form.values}
                id='name'
                type='text'
                label='User Name'
                placeholder='User name'
              />
              <FormItem
                schema={form.values}
                id='email'
                type='email'
                label='Email Address'
                placeholder='Email address'
              />
              <FormItem
                schema={form.values}
                id='password'
                type='password'
                label='Password'
                placeholder='Password'
                helpText={SignUpFormUtils.passwordMinLength('6')}
                instantFeedback={true}
              />
              <FormItem
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
          Already Have an Account?{' '}
          <Link to={redirect ? `${Route.signIn(redirect)}` : Route.signIn()}>Sign In</Link>
        </Col>
      </Row>
    </JustifyCenter>
  );
};
