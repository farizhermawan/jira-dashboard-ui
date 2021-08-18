import React from 'react';
import faker from 'faker/locale/en_US';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import {DropdownItem, DropdownMenu} from './../../../components';
import {useAuth} from "../../../contexts/auth";

const DropdownProfile = (props) => {
  const { setAuthTokens } = useAuth();

  return (
    <React.Fragment>
      <DropdownMenu right={props.right}>
        <DropdownItem header>
          {faker.name.firstName()} {faker.name.lastName()}
        </DropdownItem>
        <DropdownItem divider/>
        <DropdownItem tag={Link} to="/apps/profile-details">
          My Profile
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/settings-edit">
          Settings
        </DropdownItem>
        <DropdownItem tag={Link} to="/apps/billing-edit">
          Billings
        </DropdownItem>
        <DropdownItem divider/>
        <DropdownItem onClick={() => setAuthTokens(null)}>
          <i className="fa fa-fw fa-sign-out mr-2"/>
          Keluar
        </DropdownItem>
      </DropdownMenu>
    </React.Fragment>
  );
};

DropdownProfile.propTypes = {
  position: PropTypes.string,
  right: PropTypes.bool
};
DropdownProfile.defaultProps = {
  position: ""
};

export {DropdownProfile};
