import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import styles from './index.module.scss';

export const AppButton: React.FC = () => {
  const onClickHandler = useCallback(() => {
    console.log('Button clicked!');
  }, []);

  return (
    <div className={styles.mySpecialStyle}>
      <p className={styles.mySpecialTitle}>some value</p>
      <Button variant='primary' onClick={onClickHandler} className={styles.buttonBlue}>
        Primary Button
      </Button>
    </div>
  );
};
