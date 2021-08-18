import React, {useState} from 'react';

import {
  Avatar,
  AvatarAddOn,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Sidebar,
  UncontrolledButtonDropdown
} from './../../../components';
import {useAuth} from "../../../contexts/auth";

const SidebarTopA = () => {
  const { authTokens, setAuthTokens } = useAuth();
  const [user,] = useState(authTokens ? authTokens.user : {profile: {}, roles: []});
  const avatar =  "https://ui-avatars.com/api/?name=" + user.profile.full_name;

  return (
    <React.Fragment>
      <Sidebar.HideSlim>
        <Sidebar.Section>
          <Sidebar.HideSlim>
            <Avatar.Image
              className="d-block"
              size="lg"
              src={avatar}
              addOns={[
                <AvatarAddOn.Icon
                  className="fa fa-circle"
                  color="white"
                  key="avatar-icon-bg"
                />,
                <AvatarAddOn.Icon
                  className="fa fa-circle"
                  color="success"
                  key="avatar-icon-fg"
                />
              ]}
            />
          </Sidebar.HideSlim>
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
              {user.profile.full_name}
              <i className="fa fa-angle-down ml-2"/>
            </DropdownToggle>
            <DropdownMenu persist>
              <DropdownItem header>{user.profile.email || ''}</DropdownItem>
              <DropdownItem header>Role: {user.roles.join(', ')}</DropdownItem>
              <DropdownItem divider/>
              <DropdownItem onClick={() => setAuthTokens(null)}>
                <i className="fa fa-fw fa-sign-out mr-2"/>
                Keluar
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </Sidebar.Section>
      </Sidebar.HideSlim>

      <Sidebar.ShowSlim>
        <Sidebar.Section>
          <Avatar.Image
            size="sm"
            src={avatar}
            addOns={[
              <AvatarAddOn.Icon
                className="fa fa-circle"
                color="white"
                key="avatar-icon-bg"
              />,
              <AvatarAddOn.Icon
                className="fa fa-circle"
                color="success"
                key="avatar-icon-fg"
              />
            ]}
          />
        </Sidebar.Section>
      </Sidebar.ShowSlim>
    </React.Fragment>
  );
};

export {SidebarTopA};
