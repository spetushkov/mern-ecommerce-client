import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
};

export const AppForm = (props: Props): JSX.Element => {
  const { children } = props;

  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};
