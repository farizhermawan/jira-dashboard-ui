import React from 'react';
import {toast} from "react-toastify";
import PropTypes from "prop-types";

import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from "components";
import {NotificationBody} from "routes/components/CRUD";
import {useAuth} from "contexts/auth";
import {useSharedState} from "contexts/sharedState";
import DataService from "services/DataService";

const ToolbarAction = ({item}) => {
  const {authTokens} = useAuth();
  const {refresh} = useSharedState();
  const profile = authTokens.user.profile;

  const revoke = () => {
    if (profile.email === item.email) {
      toast.error(<NotificationBody text="Can't revoke your self!" icon={"fa-close"}/>, {autoClose: 10000000});
      return;
    }
    DataService.delete("/v1/roles/1/users/" + item.id).then((response) => {
      if (!response.error) {
        toast.success(<NotificationBody text={item.email + " has been revoked!"}/>);
        refresh();
      }
    });
  };

  return (
    <UncontrolledButtonDropdown>
      <DropdownToggle color="link" className="text-decoration-none">
        <i className="fa fa-gear"/><i className="fa fa-angle-down ml-2"/>
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={() => revoke()}>
          <i className="fa fa-fw fa-remove mr-2"/>
          Revoke Access
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledButtonDropdown>
  );
};

ToolbarAction.propTypes = {
  item: PropTypes.object,
};

export default ToolbarAction;
