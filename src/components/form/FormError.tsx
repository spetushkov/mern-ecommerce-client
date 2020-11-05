import React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  errors: string[];
};

export const FormError = (props: Props): JSX.Element | null => {
  const { errors } = props;

  if (errors.length === 0) {
    return null;
  }

  return (
    <Alert variant='danger'>
      {errors.map((error, index) => (
        <span key={index} style={styles.container}>
          {error}
        </span>
      ))}
    </Alert>
  );
};

type Styles = {
  container: React.CSSProperties;
};

const styles: Styles = {
  container: { display: 'block' },
};
