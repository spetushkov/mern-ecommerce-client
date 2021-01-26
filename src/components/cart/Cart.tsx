import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useMemo } from 'react';
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Route } from '../../router/Route';
import { State } from '../../store/StoreConfig';
import { NumberUtils } from '../../utils/NumberUtils';
import { ProductUtils } from '../product/ProductUtils';
import { CartActions } from './CartActions';
import { CartUtils } from './CartUtils';
import { OrderItem } from './orderItem/type/OrderItem';

export const Cart = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartState = useSelector((state: State) => state.cart);
  const { orderItems } = cartState.data;

  const orderItemsCount = useMemo(() => {
    return CartUtils.getOrderItemsCount(orderItems);
  }, [orderItems]);

  const orderItemsTotal = useMemo(() => {
    return orderItems
      ? NumberUtils.toFixed(
          orderItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0),
        )
      : 0.0;
  }, [orderItems]);

  const changeOrderItemQuantityHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
      dispatch(CartActions.addOrderItem(id, Number(e.target.value)));
    },
    [dispatch],
  );

  const removeOrderItemHandler = useCallback(
    (id: string) => {
      dispatch(CartActions.removeOrderItem(id));
    },
    [dispatch],
  );

  const checkoutHandler = (): void => {
    history.push(`${Route.signIn(Route.orderShippingAddress())}`);
  };

  const isCheckoutable = (): boolean => {
    return orderItems && orderItems.length > 0 ? true : false;
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!isCheckoutable() ? (
          <EmptyCart />
        ) : (
          <CartItems
            orderItems={orderItems}
            changeOrderItemQuantityHandler={changeOrderItemQuantityHandler}
            removeOrderItemHandler={removeOrderItemHandler}
          />
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h4>Subtotal ({orderItemsCount}) items</h4>${orderItemsTotal}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={!isCheckoutable()}
                onClick={checkoutHandler}
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

const EmptyCart = (): JSX.Element => {
  return (
    <Alert variant='info'>
      Your cart is empty <Link to={Route.home()}>Go Back</Link>
    </Alert>
  );
};

type CartItemsProps = {
  orderItems: OrderItem[] | null;
  changeOrderItemQuantityHandler: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void;
  removeOrderItemHandler: (id: string) => void;
};

const CartItems = (props: CartItemsProps): JSX.Element => {
  const { orderItems, changeOrderItemQuantityHandler, removeOrderItemHandler } = props;

  const renderOrderItemStockValues = useCallback((countInStock: number) => {
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

  return (
    <ListGroup variant='flush'>
      {orderItems &&
        orderItems.map((orderItem) => (
          <ListGroup.Item key={orderItem.product}>
            <Row>
              <Col md={2}>
                <Image
                  src={ProductUtils.getProductImageUrl(orderItem.image)}
                  alt={orderItem.name}
                  fluid
                  rounded
                />
              </Col>
              <Col md={3}>{orderItem.name}</Col>
              <Col md={2}>${orderItem.price}</Col>
              <Col md={2}>
                <Form.Control
                  as='select'
                  value={orderItem.quantity}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    changeOrderItemQuantityHandler(e, orderItem.product)
                  }
                >
                  {renderOrderItemStockValues(orderItem.countInStock)}
                </Form.Control>
              </Col>
              <Col md={3}>
                <Button
                  type='button'
                  variant='light'
                  onClick={() => removeOrderItemHandler(orderItem.product)}
                >
                  <FontAwesomeIcon icon={['fas', 'trash']} />
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};
