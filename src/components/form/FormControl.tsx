import React from 'react';
import { Form } from 'react-bootstrap';
import { Form as FormikForm } from './Form';
import { FormControlError } from './FormControlError';

type Props<T> = {
  form: FormikForm<T>;
  controlId: keyof T;
  label?: string;
  type?: string;
  placeholder?: string;
};

export const FormControl = <T,>(props: React.PropsWithChildren<Props<T>>): JSX.Element => {
  const { controlId, label, form, ...restProps } = props;

  return (
    <Form.Group controlId={controlId as string}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...restProps}
        name={controlId as string}
        value={form.values[controlId] as any}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      <FormControlError form={form} controlId={controlId} />
    </Form.Group>
  );
};
