import React, { useCallback, useState } from 'react';
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Spinner } from '../../Spinner';
import { ProductRating } from '../ProductRating';
import { ProductState } from './ProductStore';

type Props = ProductState & {
  history: any;
};

export const Product = (props: Props): JSX.Element => {
  const { loading, data, error, history } = props;
  const product = data ? data.data : null;

  const [quantity, setQuantity] = useState(1);

  const onSelectQuantityHandler = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      e.preventDefault();

      setQuantity(Number(e.target.value));
    },
    [setQuantity],
  );

  const addToCartHandler = useCallback(() => {
    if (!product) {
      return;
    }

    history.push(`/cart/${product.id}?quantity=${quantity}`);
  }, [history, product, quantity]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert variant='danger'>{error.message}</Alert>;
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
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
                        <Form.Control
                          as='select'
                          value={quantity}
                          onChange={onSelectQuantityHandler}
                        >
                          {renderStockValues(product.countInStock)}
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

const renderStockValues = (countInStock: number) => {
  const keys = [...Array(countInStock).keys()];
  return keys.map((key) => {
    const optionvalue = key + 1;
    return (
      <option key={optionvalue} value={optionvalue}>
        {optionvalue}
      </option>
    );
  });
};
