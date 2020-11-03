import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Style } from '../style/Style';

export const Loader = (): JSX.Element => {
  return (
    <Spinner animation='border' role='status' style={styles.container}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

const styles: Style = {
  container: { width: '100px', height: '100px', margin: 'auto', display: 'block' },
};
