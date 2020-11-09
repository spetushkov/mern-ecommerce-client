import React from 'react';
import { Nav } from 'react-bootstrap';
import { RouterEndpoint } from '../../../router/RouterEndpoint';
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
      <CheckoutStepsItem step={step1} linkUrl={RouterEndpoint.signIn()} linkName='Sign In' />
      <CheckoutStepsItem step={step2} linkUrl={RouterEndpoint.shipping()} linkName='Shipping' />
      <CheckoutStepsItem step={step3} linkUrl={RouterEndpoint.payment()} linkName='Payment' />
      <CheckoutStepsItem step={step4} linkUrl={RouterEndpoint.order()} linkName='Place Order' />
    </Nav>
  );
};
