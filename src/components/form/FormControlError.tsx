import { FieldMetaProps } from 'formik';
import React from 'react';

interface Props<T> {
  fieldMeta: FieldMetaProps<T>;
}

export const FormControlError = <T,>(
  props: React.PropsWithChildren<Props<T>>,
): JSX.Element | null => {
  const { fieldMeta } = props;

  if (!(fieldMeta.touched && fieldMeta.error)) {
    return null;
  }

  return <div>{fieldMeta.error}</div>;
};
