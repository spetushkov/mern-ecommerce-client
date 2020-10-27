import React, { FC } from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader: FC = () => {
  return (
    <Spinner animation='border' role='status' style={styles.container}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

const styles = {
  container: { width: '100px', height: '100px', margin: 'auto', display: 'block' },
};
