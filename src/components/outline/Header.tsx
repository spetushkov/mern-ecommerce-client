import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from '../../router/Route';
import { State } from '../../store/Store';
import { AuthActions } from '../auth/AuthActions';
import { CartActions } from '../cart/CartActions';
import { CartUtils } from '../cart/CartUtils';
import { OrderActions } from '../order/OrderActions';
import { SearchForm } from '../search/SearchForm';
import { UserActions } from '../user/UserActions';

export const Header = (): JSX.Element => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const authState = useSelector((state: State) => state.auth);
  const { data: authData } = authState;

  const cartState = useSelector((state: State) => state.cart);
  const { orderItems } = cartState.data;

  const orderItemsCount = useMemo(() => {
    return CartUtils.getOrderItemsCount(orderItems);
  }, [orderItems]);

  const signOutHandler = () => {
    dispatch(AuthActions.signOut());
    dispatch(CartActions.reset());
    dispatch(OrderActions.reset());
    dispatch(UserActions.reset());
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to={Route.home()}>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <SearchForm />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Language' id='language'>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('de')}>German</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to={Route.cart()}>
                <Nav.Link>
                  {orderItemsCount > 0 && <span>{orderItemsCount}</span>}
                  <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {authData ? (
                <NavDropdown title={authData.user.name} id='user'>
                  <LinkContainer to={Route.customerOrders()}>
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOutHandler}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={Route.signIn()}>
                  <Nav.Link>
                    <FontAwesomeIcon icon={['fas', 'user']} />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {authData && authData.user.isAdmin && (
                <NavDropdown title='Admin' id='admin'>
                  <LinkContainer to={Route.adminUsers()}>
                    <NavDropdown.Item>All Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={Route.adminOrders()}>
                    <NavDropdown.Item>All Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={Route.adminProducts()}>
                    <NavDropdown.Item>All Products</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
