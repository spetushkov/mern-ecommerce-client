import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Route } from '../../../../router/Route';
import { State } from '../../../../store/Store';
import { StoreError } from '../../../../store/StoreError';
import { StoreLoader } from '../../../../store/StoreLoader';
import { useRequireAuthorize } from '../../../auth/useRequireAuthorize';
import { ProductActions } from '../../ProductActions';

export const Products = (): JSX.Element => {
  useRequireAuthorize('ADMIN');

  const dispatch = useDispatch();
  const history = useHistory();

  const productState = useSelector((state: State) => state.product);
  const { loading, data, error } = productState;
  const products = (data.products && data.products.data) ?? null;

  useEffect(() => {
    dispatch(ProductActions.findAll());
  }, [dispatch]);

  const createProductHandler = (): void => {
    dispatch(ProductActions.resetProduct());
    history.push(Route.adminCreateProduct());
  };

  const editProductHandler = (id: string): void => {
    history.push(Route.adminProducts(id));
  };

  const deleteProductHandler = (id: string): void => {
    if (window.confirm('Are you sure?')) {
      dispatch(ProductActions.deleteById(id));
    }
  };

  return (
    <>
      {loading && <StoreLoader />}
      {error && <StoreError error={error} />}
      <Row className='align-items-center'>
        <Col>
          <h4>All Products</h4>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 btn-sm' onClick={createProductHandler} title='Create Product'>
            <FontAwesomeIcon icon={['fas', 'plus']} />
            Create Product
          </Button>
        </Col>
      </Row>
      <Row>
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      title='Edit Product'
                      onClick={() => editProductHandler(product.id)}
                    >
                      <FontAwesomeIcon icon={['fas', 'edit']} />
                    </Button>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      title='Delete Product'
                      onClick={() => deleteProductHandler(product.id)}
                    >
                      <FontAwesomeIcon icon={['fas', 'trash']} />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};
