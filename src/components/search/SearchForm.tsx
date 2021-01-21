import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';

export const SearchForm = (): JSX.Element => {
  const history = useHistory();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(Route.search(keyword.trim()));
    } else {
      history.push(Route.home());
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
