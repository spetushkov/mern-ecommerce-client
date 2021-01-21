import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Route } from '../../router/Route';
import { State } from '../../store/Store';
import { StoreError } from '../../store/StoreError';
import { StoreLoader } from '../../store/StoreLoader';
import { useAuthenticate } from '../auth/useAuthenticate';
import { CartActions } from '../cart/CartActions';
import { ProductRating } from '../rating/ProductRating';
import { Rating } from '../rating/Rating';
import { Review } from '../review/type/Review';
import { ProductActions } from './ProductActions';
import { ProductUtils } from './ProductUtils';

type Params = {
  id: string;
};

export const Product = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id } = useParams<Params>();

  const productState = useSelector((state: State) => state.product);
  const { loading, data, error: productError } = productState;
  const product = data.product;
  const review = data.review;

  const cartState = useSelector((state: State) => state.cart);
  const { error: cartError } = cartState;

  const { getUser } = useAuthenticate();
  const user = getUser();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (review) {
      alert('Review submitted!');
      setRating(0);
      setComment('');
    }

    dispatch(ProductActions.findById(id));
  }, [dispatch, id, review]);

  const changeQuantityHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setQuantity(Number(e.target.value));
  };

  const addToCartHandler = (): void => {
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

  const submitReviewHandler = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    const review: Review = {
      id: '',
      rating,
      comment,
      user: user?.id ?? '',
      product: id,
    };

    dispatch(ProductActions.saveReview(review));
  };

  return (
    <>
      <Helmet>
        <title>{product && product.name}</title>
      </Helmet>
      {loading && <StoreLoader />}
      {productError && <StoreError error={productError} />}
      {cartError && <StoreError error={cartError} />}
      <Link className='btn btn-light my-3' to={Route.home()}>
        Go Back
      </Link>
      {product && (
        <>
          <Row>
            <Col md={6}>
              <Image
                src={ProductUtils.getProductImageUrl(product.image)}
                alt={product.name}
                fluid
              />
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
                            onChange={changeQuantityHandler}
                          >
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
          <Row>
            <Col md={6}>
              <h3>Reviews</h3>
              {!product.reviews ||
                (product.reviews.length === 0 && <Alert variant='info'>No Reviews</Alert>)}
              {product.reviews && (
                <ListGroup variant='flush'>
                  {(product._reviews as Review[]).map((review) => (
                    <ListGroup.Item key={review.id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{review.createdAt && review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup variant='flush'>
                <h3>Write a Customer Review</h3>
                {!user && (
                  <Alert variant='info'>
                    Please <Link to={Route.signIn(Route.products(id))}>sign in</Link> to write a
                    review
                  </Alert>
                )}
                {user && (
                  <Form onSubmit={submitReviewHandler}>
                    <Form.Group>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option key={0} value={0}>
                          ...Select
                        </option>
                        <option key={1} value={1}>
                          1 - Poor
                        </option>
                        <option key={2} value={2}>
                          2 - Fair
                        </option>
                        <option key={3} value={3}>
                          3 - Good
                        </option>
                        <option key={4} value={4}>
                          4 - Very Good
                        </option>
                        <option key={5} value={5}>
                          5 - Excelent
                        </option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </Form.Group>
                    <Button type='submit' variant='primary' disabled={rating === 0}>
                      Submit
                    </Button>
                  </Form>
                )}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
