import React from 'react';

type Props = {
  error?: string;
};

export const FormItemError = (props: Props): JSX.Element | null => {
  const { error } = props;

  if (!error) {
    return null;
  }

  const errors = [...error];
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

type Styles = {
  container: React.CSSProperties;
};

const styles: Styles = {
  container: { display: 'block', color: 'red' },
};
