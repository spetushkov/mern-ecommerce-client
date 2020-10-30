import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { LinkContainer } from 'react-router-bootstrap';

export const Header = (): JSX.Element => {
  const { i18n } = useTranslation();

  const signOutHandler = () => {
    console.log('signOutHandler');
  };

  const userInfo = null;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProSHop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <NavDropdown title='Language' id='language'>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('de')}>German</NavDropdown.Item>
              </NavDropdown>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <FontAwesomeIcon icon={['fas', 'shopping-cart']} />
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title='some name' id='userName'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={signOutHandler}>Sign Out</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/signin'>
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
