import { Formik, FormikErrors, FormikHelpers, FormikProps } from 'formik';
import React, { useEffect, useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ClassTransformer } from '../../class/ClassTransformer';
import { State } from '../../store/Store';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { useRequireAuthenticate } from '../auth/useRequireAuthenticate';
import { JustifyCenter } from '../utility/content/JustifyCenter';
import { FormControl } from '../utility/form/FormControl';
import { FormUtils } from '../utility/form/FormUtils';
import { UserActions } from './UserActions';
import { UserForm } from './UserForm';

type Params = {
  id: string;
};

export const User = (): JSX.Element => {
  useRequireAuthenticate();

  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  const userState = useSelector((state: State) => state.user);
  const { loading, data, error } = userState;
  const user = data.user;

  useEffect(() => {
    dispatch(UserActions.findById(id));
  }, [dispatch, id]);

  const initialFormState = useMemo(() => ClassTransformer.fromPlain(UserForm, user), [user]);

  const validateFormHandler = async (values: UserForm): Promise<FormikErrors<UserForm>> => {
    try {
      const result = await FormUtils.validate(values, UserForm);
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const isFormSubmittable = (form: FormikProps<UserForm>) => {
    return FormUtils.isSubmittable(form);
  };

  const submitFormHandler = async (
    values: UserForm,
    FormActions: FormikHelpers<UserForm>,
  ): Promise<void> => {
    const formState = FormUtils.getState(values, UserForm);

    dispatch(UserActions.updateById(id, formState));

    FormActions.setSubmitting(false);
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <JustifyCenter>
        <h1>Edit User</h1>
        <Formik
          enableReinitialize={true}
          initialValues={initialFormState ?? new UserForm()}
          validate={validateFormHandler}
          onSubmit={submitFormHandler}
        >
          {(form) => (
            <>
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
                <Button type='submit' variant='primary' disabled={!isFormSubmittable(form)}>
                  {form.isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </Form>
            </>
          )}
        </Formik>
      </JustifyCenter>
    </>
  );
};
