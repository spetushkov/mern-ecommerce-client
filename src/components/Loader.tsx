import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = (): JSX.Element => {
  return (
    <Spinner animation='border' role='status' style={styles.container}>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

type Styles = {
  container: React.CSSProperties;
};

const styles: Styles = {
  container: { width: '100px', height: '100px', margin: 'auto', display: 'block' },
};
