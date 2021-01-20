import React from 'react';
import { Nav } from 'react-bootstrap';
import { Route } from '../../../router/Route';
import { CheckoutStepsItem } from './CheckoutStepsItem';

type Props = {
  step1?: boolean;
  step2?: boolean;
  step3?: boolean;
  step4?: boolean;
};

export const CheckoutSteps = (props: Props): JSX.Element => {
  const { step1, step2, step3, step4 } = props;

  return (
    <Nav className='justify-content-center mb-4'>
      <CheckoutStepsItem
        step={step1}
        linkUrl={Route.signIn(Route.orderShippingAddress())}
        linkName='Sign In'
      />
      <CheckoutStepsItem
        step={step2}
        linkUrl={Route.orderShippingAddress()}
        linkName='Shipping Address'
      />
      <CheckoutStepsItem
        step={step3}
        linkUrl={Route.orderPaymentMethod()}
        linkName='Payment Method'
      />
      <CheckoutStepsItem step={step4} linkUrl={Route.orderConfirm()} linkName='Confirmation' />
    </Nav>
  );
};
