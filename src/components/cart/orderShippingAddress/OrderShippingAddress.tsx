import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../../router/Route';
import { State } from '../../../store/Store';
import { useAuthenticate } from '../../auth/useAuthenticate';
import { JustifyCenter } from '../../utility/content/JustifyCenter';
import { CartActions } from '../CartActions';
import { CheckoutSteps } from '../checkoutSteps/CheckoutSteps';
import { OrderShippingAddress as ShippingAddressType } from './type/OrderShippingAddress';

export const OrderShippingAddress = (): JSX.Element => {
  useAuthenticate();

  const dispatch = useDispatch();
  const history = useHistory();

  const cartState = useSelector((state: State) => state.cart);
  const { shippingAddress } = cartState.data;

  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '');
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '');
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : '');
  const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : '');

  const submitHandler = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    const shippingAddress: ShippingAddressType = {
      address,
      city,
      postalCode,
      country,
    };

    dispatch(CartActions.saveShippingAddress(shippingAddress));

    history.push(Route.orderPaymentMethod());
  };

  return (
    <JustifyCenter>
      <CheckoutSteps step1 step2 />
      <h1>Shipping Address</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </JustifyCenter>
  );
};
