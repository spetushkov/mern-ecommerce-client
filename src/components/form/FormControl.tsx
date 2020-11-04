import { useField } from 'formik';
import React from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { Style } from '../../style/Style';
import { FormControlError } from './FormControlError';

type Props<T> = React.HTMLProps<any> &
  FormControlProps & {
    schema: T;
    id: Extract<keyof T, string>;
    label?: string;
  };

export const FormControl = <T,>(props: React.PropsWithChildren<Props<T>>): JSX.Element => {
  const { id, label, ...restProps } = props;
  const [fieldProps, fieldMeta] = useField(id);

  // const style = fieldMeta.error ? styles.error : null;
  const style = styles.error;

  return (
    <Form.Group controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...fieldProps} {...restProps} style={{ borderColor: 'red' }} name={id} />
      <FormControlError fieldMeta={fieldMeta} />
    </Form.Group>
  );
};

const styles: Style = {
  error: { borderColor: 'red' },
};
