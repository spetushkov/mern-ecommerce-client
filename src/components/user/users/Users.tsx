import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { State } from '../../../store/StoreConfig';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { useRequireAuthenticate } from '../../auth/useRequireAuthenticate';
import { UserActions } from '../UserActions';

export const Users = (): JSX.Element => {
  useRequireAuthenticate();

  const dispatch = useDispatch();
  const history = useHistory();

  const userState = useSelector((state: State) => state.user);
  const { loading, data, error } = userState;
  const users = (data.users && data.users.data) ?? null;

  useEffect(() => {
    dispatch(UserActions.findAll());
  }, [dispatch]);

  const editUserHandler = (id: string): void => {
    history.push(Route.adminUsers(id));
  };

  const deleteUserHandler = (id: string): void => {
    if (window.confirm('Are you sure?')) {
      dispatch(UserActions.deleteById(id));
    }
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <h4>All Users</h4>
      <Row>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.roles?.includes('ADMIN') ? (
                      <FontAwesomeIcon icon={['fas', 'check']} color='green' />
                    ) : (
                      <FontAwesomeIcon icon={['fas', 'times']} color='red' />
                    )}
                  </td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => editUserHandler(user.id)}
                    >
                      <FontAwesomeIcon icon={['fas', 'edit']} />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteUserHandler(user.id)}
                    >
                      <FontAwesomeIcon icon={['fas', 'trash']} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};
