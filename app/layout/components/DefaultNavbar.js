import React from 'react';
import {Link} from 'react-router-dom';

import {Nav, Navbar, NavItem, SidebarTrigger} from './../../components';

import {NavbarActivityFeed} from './NavbarActivityFeed';
import {NavbarMessages} from './NavbarMessages';
import {NavbarUser} from './NavbarUser';
import {LogoThemed} from './../../routes/components/LogoThemed/LogoThemed';

export const DefaultNavbar = () => (
  <Navbar light expand="xs" fluid>
    <Nav navbar>
      <NavItem className="mr-3 mt-auto mb-auto">
        <SidebarTrigger/>
      </NavItem>
      {/*<NavItem className="navbar-brand">*/}
      {/*  <Link to="/">*/}
      {/*    <LogoThemed/>*/}
      {/*  </Link>*/}
      {/*</NavItem>*/}
    </Nav>
    <Nav navbar className="ml-auto">
      {/*<NavbarActivityFeed/>*/}
      {/*<NavbarMessages className="ml-2"/>*/}
      <NavbarUser className="ml-2"/>
    </Nav>
  </Navbar>
);
