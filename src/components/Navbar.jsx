import React from 'react';
import PropTypes from 'prop-types';
import { Container, Navbar } from "react-bootstrap";
import Logo from '../assets/Logo.png';


const Nav = () => {

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <div id='navBar'>
            <img alt="Logotipo" src={Logo} width="60" height="60" />
            <h1>My WishList</h1>
          </div>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Nav;
