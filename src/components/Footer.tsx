import React, { FC } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export const Footer: FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; ProShop</Col>
        </Row>
      </Container>
    </div>
  );
};
