import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { RouterEndpoint } from '../../router/RouterEndpoint';
import { State } from '../../store/Store';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { CartActions } from '../cart/CartActions';
import { ProductActions } from './ProductActions';
import { ProductRating } from './rating/ProductRating';

type Params = {
  id: string;
};

export const Product = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  useEffect(() => {
    dispatch(ProductActions.findById(id));
  }, [dispatch, id]);

  const productState = useSelector((state: State) => state.product);
  const { loading, data: product, error } = productState;

  const [quantity, setQuantity] = useState(1);

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const addToCartHandler = () => {
    if (!product) {
      return;
    }

    dispatch(CartActions.addOrderItem(product.id, quantity));
  };

  const countInStockValues = useMemo(() => {
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
  }, [product]);

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <Link className='btn btn-light my-3' to={RouterEndpoint.home()}>
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
                          {countInStockValues}
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
