import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = (props) => {
  const { baseUrl } = props;
  const menu = (
    <Navbar collapseOnSelect fixedTop className="navbar-custom">
      <Navbar.Header>
        <Navbar.Brand>
          <Link to={`${baseUrl}`}>Kodify Blog</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <LinkContainer to={`${baseUrl}`}>
            <NavItem>Posts</NavItem>
          </LinkContainer>
          <LinkContainer to={`${baseUrl}posts/create`}>
            <NavItem>Create Post</NavItem>
          </LinkContainer>
          <LinkContainer to={`${baseUrl}author/new`}>
            <NavItem>Create Author</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );

  return menu;
};

export default Menu;
