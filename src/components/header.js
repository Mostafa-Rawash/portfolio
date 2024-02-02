import React from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


export default function Header() {
  return (
    <Navbar expand="lg" >
      <Container>
        <Navbar.Brand href="/">Madelyn Torff</Navbar.Brand>
          <Nav>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#contacts">Contacts</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}
