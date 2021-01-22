import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { State } from '../../store/Store';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { NumberUtils } from '../../utils/NumberUtils';
import { useAuthenticate } from '../auth/useAuthenticate';
import { useRequireAuthenticate } from '../auth/useRequireAuthenticate';
import { CartActions } from '../cart/CartActions';
import { PayPalUtils } from '../payPal/PayPalUtils';
import { PayPalPaymentResult } from '../payPal/type/PayPalPaymentResult';
import { ProductUtils } from '../product/ProductUtils';
import { User } from '../user/type/User';
import { OrderActions } from './OrderActions';
import { Order as OrderType } from './type/Order';

type Params = {
  id: string;
};

type Props = {
  queryByUserId: boolean;
};

export const Order = (props: Props): JSX.Element => {
  useRequireAuthenticate();

  const dispatch = useDispatch();
  const { id } = useParams<Params>();
  const { queryByUserId } = props;

  const orderState = useSelector((state: State) => state.order);
  const { loading, data, error } = orderState;
  const order = data.order;
  const user = order && order.user ? (order.user as User) : null;
  const payPalClientId = (data.config && data.config.payPalClientId) ?? undefined;

  const [payPalSdkReady, setPayPalSdkReady] = useState(false);

  const { includesRole } = useAuthenticate();
  const isAdmin = includesRole('ADMIN');

  useEffect(() => {
    dispatch(OrderActions.findById(id, queryByUserId));
  }, [dispatch, id, queryByUserId]);

  useEffect(() => {
    dispatch(OrderActions.configFindById('payPalClientId'));
  }, [dispatch]);

  useEffect(() => {
    if (payPalClientId) {
      PayPalUtils.initSdk(payPalClientId, () => setPayPalSdkReady(true));
    }
  }, [payPalClientId]);

  const payOrderWithPayPalHandler = (paymentResult: PayPalPaymentResult): void => {
    dispatch(OrderActions.pay(id, { paymentResult }));
    dispatch(CartActions.reset());
  };

  const isPayOrderWithPayPal = (): boolean => {
    return !loading && !error && payPalSdkReady && !!order && !order.isPaid && order.totalPrice > 0;
  };

  const orderDeliveredHandler = (): void => {
    const query: Partial<OrderType> = {
      isDelivered: true,
      deliveredAt: new Date(),
    };
    dispatch(OrderActions.updateById(id, query));
  };

  const orderDeliveredHandlerEnabled = (): boolean => {
    return !!(order && !order.isDelivered && order.isPaid);
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
                {order.isDelivered ? (
                  <Alert variant='success'>Delivered on {order.deliveredAt}</Alert>
                ) : (
                  <Alert variant='danger'>Not delivered</Alert>
                )}
              </ListGroup.Item>
            )}

            {order && order.paymentMethod && (
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <Alert variant='success'>Paid on {order.paidAt}</Alert>
                ) : (
                  <Alert variant='danger'>Not paid</Alert>
                )}
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
                          <Image
                            src={ProductUtils.getProductImageUrl(item.image)}
                            alt={item.name}
                            fluid
                            rounded
                          />
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
              {isPayOrderWithPayPal() && (
                <ListGroup.Item>
                  <PayPalButton
                    amount={(order && order.totalPrice) ?? 0}
                    onSuccess={payOrderWithPayPalHandler}
                  />
                </ListGroup.Item>
              )}
              {isAdmin && (
                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn btn-block'
                    disabled={!orderDeliveredHandlerEnabled()}
                    onClick={orderDeliveredHandler}
                  >
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
