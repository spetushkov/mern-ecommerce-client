import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { RouterEndpoint } from '../../router/RouterEndpoint';
import { State } from '../../store/Store';
import { AuthActions } from '../auth/AuthActions';
import { CartActions } from '../cart/CartActions';
import { CartUtils } from '../cart/CartUtils';
import { OrderActions } from '../order/OrderActions';

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
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to={RouterEndpoint.home()}>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Language' id='language'>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('de')}>German</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to={RouterEndpoint.cart()}>
                <Nav.Link>
                  {orderItemsCount > 0 && <span>{orderItemsCount}</span>}
                  <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {authData ? (
                <NavDropdown title={authData.user.name} id='userName'>
                  <LinkContainer to={RouterEndpoint.orders()}>
                    <NavDropdown.Item>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOutHandler}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={RouterEndpoint.signIn()}>
                  <Nav.Link>
                    <FontAwesomeIcon icon={['fas', 'user']} />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
