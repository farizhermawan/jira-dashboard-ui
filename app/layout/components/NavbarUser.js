import React from 'react';
import PropTypes from 'prop-types';

import {NavItem, NavLink} from './../../components';
import {useAuth} from "../../contexts/auth";
import {Link} from "react-router-dom";

const NavbarUser = (props) => {
  const { setAuthTokens } = useAuth();

  return (
    <NavItem {...props}>
      <NavLink tag={Link} to="#" onClick={() => setAuthTokens(null)}>
        <i className="fa fa-power-off"/>
      </NavLink>
    </NavItem>
  );
};

NavbarUser.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};

export {NavbarUser};
