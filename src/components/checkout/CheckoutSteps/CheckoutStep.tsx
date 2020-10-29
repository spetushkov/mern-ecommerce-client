import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

type Props = {
  step: boolean;
  linkUrl: string;
  linkName: string;
};

export const CheckoutStep = (props: Props): JSX.Element => {
  const { step, linkUrl, linkName } = props;

  if (!step) {
    return (
      <Nav.Item>
        <Nav.Link disabled>{linkName}</Nav.Link>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item>
      <LinkContainer to={linkUrl}>
        <Nav.Link>{linkName}</Nav.Link>
      </LinkContainer>
    </Nav.Item>
  );
};
