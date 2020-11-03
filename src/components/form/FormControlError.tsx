import React from 'react';
import { Form } from './Form';

interface Props<T> {
  form: Form<T>;
  controlId: keyof T;
}

export const FormControlError = <T,>(
  props: React.PropsWithChildren<Props<T>>,
): JSX.Element | null => {
  const { controlId, form } = props;

  if (!(form.touched[controlId] && form.errors[controlId])) {
    return null;
  }

  return <div>{form.errors[controlId]}</div>;
};
