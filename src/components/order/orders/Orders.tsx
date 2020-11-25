import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouterEndpoint } from '../../../router/RouterEndpoint';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { useUserAuthenticator } from '../../auth/useUserAuthenticator';
import { OrderActions } from '../OrderActions';

type Props = {
  queryByUserId: boolean;
};

export const Orders = (props: Props): JSX.Element => {
  useUserAuthenticator();

  const dispatch = useDispatch();
  const { queryByUserId } = props;

  const orderState = useSelector((state: State) => state.order);
  const { loading, data, error } = orderState;
  const orders = (data.orders && data.orders.data) ?? null;

  useEffect(() => {
    dispatch(OrderActions.findAll(queryByUserId));
  }, [dispatch, queryByUserId]);

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <h4>{queryByUserId ? 'My Orders' : 'All Orders'}</h4>
      <Row>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid && order.paidAt ? (
                      order.paidAt.toString().substring(0, 10)
                    ) : (
                      <FontAwesomeIcon icon={['fas', 'times']} color='red' />
                    )}
                  </td>
                  <td>
                    {order.isDelivered && order.deliveredAt ? (
                      order.deliveredAt.toString().substring(0, 10)
                    ) : (
                      <FontAwesomeIcon icon={['fas', 'times']} color='red' />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={RouterEndpoint.userOrders(order.id)}>
                      <Button variant='light' className='btn-sm'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};
