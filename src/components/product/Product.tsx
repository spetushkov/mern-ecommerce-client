import React, { useMemo, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Endpoint } from '../../router/Endpoint';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { ProductState } from './ProductStore';
import { ProductRating } from './rating/ProductRating';

type Props = ProductState;

export const Product = (props: Props): JSX.Element => {
  const { loading, data: product, error } = props;

  const [quantity, setQuantity] = useState(1);

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setQuantity(Number(e.target.value));
  };

  const addToCartHandler = () => {
    if (!product) {
      return;
    }
  };

  const renderCountInStockValues = useMemo(
    () => () => {
      if (!product) {
        return;
      }

      const keys = [...Array(product.countInStock).keys()];
      return keys.map((key) => {
        const optionvalue = key + 1;
        return (
          <option key={optionvalue} value={optionvalue}>
            {optionvalue}
          </option>
        );
      });
    },
    [product],
  );

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <Link className='btn btn-light my-3' to={Endpoint.home()}>
        Go Back
      </Link>
      {product && (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <ProductRating product={product} />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control as='select' value={quantity} onChange={changeQuantityHandler}>
                          {renderCountInStockValues()}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};
