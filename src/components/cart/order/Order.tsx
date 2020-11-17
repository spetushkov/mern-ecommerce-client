import React, { useEffect } from 'react';
import { Alert, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { NumberUtils } from '../../../utils/NumberUtils';
import { User } from '../../auth/type/User';
import { OrderActions } from './OrderActions';
import { OrderToPay } from './OrderApi';

type Params = {
  id: string;
};

export const Order = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  const orderState = useSelector((state: State) => state.order);
  const { loading, data, error } = orderState;
  const order = data.order;
  const user = order && order.user ? (order.user as User) : null;

  useEffect(() => {
    dispatch(OrderActions.findById(id));
  }, [dispatch, id]);

  const payOrderHandler = () => {
    const orderToPay: OrderToPay = {
      paymentResult: {
        id: 'id1',
        status: 'status1',
        update_time: 'update_time1',
        email_address: 'email_address1', //payer.email_address
      },
    };
    dispatch(OrderActions.payById(id, orderToPay));
  };

  const payOrderValidHandler = (): boolean => {
    return !loading && !error && !!order && !order.isPaid;
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <h2>Order {order && order.id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {user && (
              <ListGroup.Item>
                <h2>Customer</h2>
                <p>{user.name}</p>
                <p>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
              </ListGroup.Item>
            )}

            {order && order.shippingAddress && (
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                <p>
                  {order.isDelivered ? (
                    <Alert variant='success'>Delivered on {order.deliveredAt}</Alert>
                  ) : (
                    <Alert variant='danger'>Not delivered</Alert>
                  )}
                </p>
              </ListGroup.Item>
            )}

            {order && order.paymentMethod && (
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>{order.paymentMethod}</p>
                <p>
                  {order.isPaid ? (
                    <Alert variant='success'>Paid on {order.paidAt}</Alert>
                  ) : (
                    <Alert variant='danger'>Not paid</Alert>
                  )}
                </p>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <h2>Items</h2>
              <ListGroup variant='flush'>
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={6}>{item.name}</Col>
                        <Col md={4}>
                          {item.quantity} x ${item.price} = $
                          {NumberUtils.toFixed(item.quantity * item.price)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${NumberUtils.toFixed(order ? order.orderItemsPrice : 0)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${NumberUtils.toFixed(order ? order.shippingPrice : 0)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${NumberUtils.toFixed(order ? order.taxPrice : 0)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${NumberUtils.toFixed(order ? order.totalPrice : 0)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={!payOrderValidHandler()}
                  onClick={payOrderHandler}
                >
                  Pay Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
