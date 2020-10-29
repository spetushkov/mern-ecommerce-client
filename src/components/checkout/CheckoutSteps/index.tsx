import React from 'react';
import { Nav } from 'react-bootstrap';
import { CheckoutStep } from './CheckoutStep';

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
      <CheckoutStep step={step1} linkUrl='/signin' linkName='Sign In' />
      <CheckoutStep step={step2} linkUrl='/shipping' linkName='Shipping' />
      <CheckoutStep step={step3} linkUrl='/payment' linkName='Payment' />
      <CheckoutStep step={step4} linkUrl='/placeorder' linkName='Place Order' />
    </Nav>
  );
};
