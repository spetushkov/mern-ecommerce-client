import { GenericFieldHTMLAttributes, useField } from 'formik';
import React, { useState } from 'react';
import { Form, FormControlProps } from 'react-bootstrap';
import { FormControlError } from './FormControlError';

// controlRef example:
// const controlRef = useRef<HTMLInputElement>(null);
// const focusFormField = () => {
//   controlRef && controlRef.current && controlRef.current.focus();
// };

// callbackRef example:
// const callbackRef = (inputElement: HTMLInputElement) => {
//   inputElement && inputElement.focus();
// };

type Props<T> = GenericFieldHTMLAttributes &
  FormControlProps & {
    schema: T;
    id: Extract<keyof T, string>;
    label?: string;
    helpText?: string;
    instantFeedback?: boolean;
    controlRef?: React.RefObject<HTMLInputElement>;
    callbackRef?: (inputElement: HTMLInputElement) => void;
  };

export const FormControl = <T,>(props: React.PropsWithChildren<Props<T>>): JSX.Element => {
  const {
    id,
    label,
    helpText,
    instantFeedback = false,
    controlRef,
    callbackRef,
    ...restProps
  } = props;
  const [field, meta] = useField(id);

  // Display isValid status icon if:
  // - instantFeedback is enabled
  // - AND the input is focused AND value is longer than 2 characters or the input has been visited
  // - AND there are no errors
  const [didFocus, setDidFocus] = useState(false);
  const onFocusHandler = () => setDidFocus(true);
  const isValid =
    instantFeedback && ((didFocus && field.value.trim().length > 2) || meta.touched) && !meta.error;

  const isInvalid = !!(meta.touched && meta.error);

  return (
    <Form.Group controlId={id}>
      {label && <Form.Label>{label}</Form.Label>}

      <Form.Control
        {...field}
        {...restProps}
        isValid={isValid}
        isInvalid={isInvalid}
        name={id}
        ref={controlRef ? controlRef : callbackRef}
        onFocus={onFocusHandler}
      />
      {!isInvalid && helpText && <div className='text-muted'>{helpText}</div>}
      {isInvalid && <FormControlError error={meta.error} />}
    </Form.Group>
  );
};
