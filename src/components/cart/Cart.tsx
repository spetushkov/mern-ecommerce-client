import React, { useCallback, useMemo } from 'react';
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AuthEndpoint } from '../auth/AuthEndpoint';
import { ProductEndpoint } from '../product/ProductEndpoint';
import { CartActions } from './CartActions';
import { CartState } from './CartStore';

type Props = CartState;

export const Cart = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { orderItems } = props;

  const getOrderItemsCount = useMemo(
    () => () => {
      return orderItems.reduce((accumulator, item) => accumulator + item.quantity, 0);
    },
    [orderItems],
  );

  const getOrderItemsTotal = useMemo(
    () => () => {
      return orderItems
        .reduce((accumulator, item) => accumulator + item.quantity * item.price, 0)
        .toFixed(2);
    },
    [orderItems],
  );

  const onChangeOrderItemQuantityHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
      dispatch(CartActions.addOrderItem(id, Number(e.target.value)));
    },
    [dispatch],
  );

  const onRemoveOrderItemHandler = useCallback(
    (id: string) => {
      dispatch(CartActions.removeOrderItem(id));
    },
    [dispatch],
  );

  const onCheckoutHandler = useCallback(() => {
    history.push(`${AuthEndpoint.signIn()}?redirect=shipping`);
  }, [history]);

  const renderEmptyCart = useCallback(() => {
    return (
      <Alert variant='info'>
        Your cart is empty <Link to='/'>Go Back</Link>
      </Alert>
    );
  }, []);

  const renderStockValues = useCallback((countInStock: number) => {
    const keys = [...Array(countInStock).keys()];
    return keys.map((key) => {
      const optionValue = key + 1;
      return (
        <option key={optionValue} value={optionValue}>
          {optionValue}
        </option>
      );
    });
  }, []);

  const renderCartItems = useCallback(() => {
    return (
      <ListGroup variant='flush'>
        {orderItems &&
          orderItems.map((orderItem) => (
            <ListGroup.Item key={orderItem.product}>
              <Row>
                <Col md={2}>
                  <Image src={orderItem.image} alt={orderItem.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={ProductEndpoint.byId(orderItem.product)}>{orderItem.name}</Link>
                </Col>
                <Col md={2}>${orderItem.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={orderItem.quantity}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      onChangeOrderItemQuantityHandler(e, orderItem.product)
                    }
                  >
                    {renderStockValues(orderItem.countInStock)}
                  </Form.Control>
                </Col>
                <Col md={3}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => onRemoveOrderItemHandler(orderItem.product)}
                  >
                    <i className='fa fa-trash' />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
      </ListGroup>
    );
  }, [orderItems, onChangeOrderItemQuantityHandler, onRemoveOrderItemHandler, renderStockValues]);

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {orderItems.length === 0 ? renderEmptyCart() : renderCartItems()}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Subtotal ({getOrderItemsCount()}) items</h4>${getOrderItemsTotal()}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={orderItems.length === 0}
                onClick={onCheckoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
