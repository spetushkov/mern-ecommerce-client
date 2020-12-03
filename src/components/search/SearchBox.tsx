import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { RouterEndpoint } from '../../router/RouterEndpoint';

export const SearchBox = (): JSX.Element => {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(RouterEndpoint.search(keyword.trim()));
    } else {
      history.push(RouterEndpoint.home());
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  );
};
