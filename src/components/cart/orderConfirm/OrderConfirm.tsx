import React, { useEffect } from 'react';
import { Alert, Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { State } from '../../../store/Store';
import { StoreError } from '../../../store/StoreError';
import { StoreLoader } from '../../../store/StoreLoader';
import { NumberUtils } from '../../../utils/NumberUtils';
import { OrderActions } from '../../order/OrderActions';
import { Order as OrderType } from '../../order/type/Order';
import { ProductUtils } from '../../product/ProductUtils';
import { CheckoutSteps } from '../checkoutSteps/CheckoutSteps';

export const OrderConfirm = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartState = useSelector((state: State) => state.cart);
  const { orderItems, shippingAddress, paymentMethod } = cartState.data;

  if (!shippingAddress) {
    history.push(Route.orderShippingAddress());
  }

  if (!paymentMethod) {
    history.push(Route.orderPaymentMethod());
  }

  const orderItemsPrice = NumberUtils.round(
    orderItems
      ? orderItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0)
      : 0,
  );

  const shippingPrice = NumberUtils.round(orderItemsPrice > 100 ? 0 : 14.99);

  const taxPrice = NumberUtils.round(0.15 * orderItemsPrice);

  const totalPrice = NumberUtils.round(orderItemsPrice + shippingPrice + taxPrice);

  const orderState = useSelector((state: State) => state.order);
  const { loading, data, error } = orderState;
  const order = data.order;

  const placeOrderHandler = (): void => {
    if (!orderItems) {
      return;
    }

    const order: OrderType = {
      id: '',
      orderItems,
      shippingAddress,
      paymentMethod,
      orderItemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    dispatch(OrderActions.save(order));
  };

  const placeOrderValidHandler = (): boolean => {
    return !loading && !error && orderItemsPrice > 0;
  };

  useEffect(() => {
    if (loading || error || !order) {
      return;
    }

    history.push(Route.customerOrders(order.id));
  }, [loading, error, order, history]);

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <CheckoutSteps step1 step2 step3 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {shippingAddress && (
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  {shippingAddress.address}, {shippingAddress.city} {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
                </p>
              </ListGroup.Item>
            )}

            {paymentMethod && (
              <ListGroup.Item>
                <h2>Payment</h2>
                <p>{paymentMethod}</p>
              </ListGroup.Item>
            )}

            <ListGroup.Item>
              <h2>Order</h2>
              {!orderItems || orderItems.length === 0 ? (
                <Alert variant='info'>
                  Your cart is empty <Link to={Route.home()}>Go Back</Link>
                </Alert>
              ) : (
                <ListGroup variant='flush'>
                  {orderItems &&
                    orderItems.map((item, index) => (
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
              )}
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
                  <Col>${NumberUtils.toFixed(orderItemsPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${NumberUtils.toFixed(shippingPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${NumberUtils.toFixed(taxPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${NumberUtils.toFixed(totalPrice)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={!placeOrderValidHandler()}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
