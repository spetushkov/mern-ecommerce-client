import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { State } from '../../../store/StoreConfig';
import { JustifyCenter } from '../../utility/content/JustifyCenter';
import { CartActions } from '../CartActions';
import { CheckoutSteps } from '../checkoutSteps/CheckoutSteps';
import { OrderPaymentMethod as PaymentMethodType } from './type/OrderPaymentMethod';

export const OrderPaymentMethod = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const cartState = useSelector((state: State) => state.cart);
  const { shippingAddress, paymentMethod: paymentMethodSaved } = cartState.data;

  if (!shippingAddress) {
    history.push(Route.orderShippingAddress());
  }

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    paymentMethodSaved ? paymentMethodSaved : PaymentMethodType.PAYPAL,
  );

  const submitHandler = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    dispatch(CartActions.savePaymentMethod(paymentMethod));

    history.push(Route.orderConfirm());
  };

  return (
    <JustifyCenter>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                name='paymentMethod'
                id='PayPal'
                label='PayPal'
                checked={paymentMethod === PaymentMethodType.PAYPAL}
                value={PaymentMethodType.PAYPAL}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPaymentMethod(e.target.value as PaymentMethodType)
                }
              />
              <Form.Check
                type='radio'
                name='paymentMethod'
                id='Stripe'
                label='Stripe'
                checked={paymentMethod === PaymentMethodType.STRIPE}
                value={PaymentMethodType.STRIPE}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPaymentMethod(e.target.value as PaymentMethodType)
                }
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </JustifyCenter>
  );
};
