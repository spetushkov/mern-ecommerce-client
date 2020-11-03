import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { ApiError } from '../app/AppApi';

type Props = {
  error: ApiError | Error;
};

export const StoreError = (props: Props): JSX.Element => {
  const { error } = props;

  const message = error.message;
  const [details, setDetails] = useState();

  useEffect(() => {
    if (!(error as ApiError).isAxiosError) {
      return;
    }

    const apiError = error as ApiError;
    if (apiError.response && apiError.response.data.error) {
      setDetails(apiError.response.data.error);
    }
  }, [error]);

  return (
    <div>
      <div>
        <Alert variant='danger'>{message}</Alert>
      </div>
      <div>
        <details>
          <summary>Click for error details</summary>
          {details && details}
        </details>
      </div>
    </div>
  );
};
