import React from 'react';
import { Nav } from 'react-bootstrap';
import { AuthEndpoint } from '../../auth/AuthEndpoint';
import { OrderEndpoint } from '../order/OrderEndpoint';
import { PaymentEndpoint } from '../payment/PaymentEndpoint';
import { ShippingEndpoint } from '../shipping/ShippingEndpoint';
import { CheckoutStepsItem } from './CheckoutStepsItem';

type Props = {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
};

export const CheckoutSteps = (props: Props): JSX.Element => {
  const { step1, step2, step3, step4 } = props;

  return (
    <Nav className='justify-content-center mb-4'>
      <CheckoutStepsItem step={step1} linkUrl={AuthEndpoint.signIn()} linkName='Sign In' />
      <CheckoutStepsItem step={step2} linkUrl={ShippingEndpoint.base()} linkName='Shipping' />
      <CheckoutStepsItem step={step3} linkUrl={PaymentEndpoint.base()} linkName='Payment' />
      <CheckoutStepsItem step={step4} linkUrl={OrderEndpoint.base()} linkName='Place Order' />
    </Nav>
  );
};
