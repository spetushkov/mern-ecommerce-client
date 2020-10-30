import React from 'react';
import { Spinner as RBSpinner } from 'react-bootstrap';

type Style = Record<string, React.CSSProperties>;

export const Spinner = (): JSX.Element => {
  return (
    <RBSpinner animation='border' role='status' style={styles.container}>
      <span className='sr-only'>Loading...</span>
    </RBSpinner>
  );
};

const styles: Style = {
  container: { width: '100px', height: '100px', margin: 'auto', display: 'block' },
};
