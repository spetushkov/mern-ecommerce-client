import { FieldMetaProps } from 'formik';
import React from 'react';
import { Style } from '../../style/Style';

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

  const errors = [...fieldMeta.error];

  return (
    <div>
      {errors.map((error, index) => (
        <span key={index} style={styles.container}>
          {error}
        </span>
      ))}
    </div>
  );
};

const styles: Style = {
  container: { display: 'block', color: 'red' },
};
