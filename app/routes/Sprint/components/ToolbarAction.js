import React, {useState} from 'react';
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from "components";

import DataService from "services/DataService";
import {useSharedState} from "contexts/sharedState";
import {ConfirmationModal, NotificationBody} from "routes/components/CRUD";

const ToolbarAction = ({item}) => {

  const {refresh} = useSharedState();
  const [markDelete, setMarkDelete] = useState(null);

  const deleteItem = () => {
    DataService.delete("/v1/events/" + markDelete).then((response) => {
      if (!response.error) {
        toast.success(<NotificationBody text="Data has been removed successfully"/>);
        refresh();
      }
    });
    setMarkDelete(null);
  };

  return (
    <>
      <UncontrolledButtonDropdown>
        <DropdownToggle color="link" className="text-decoration-none">
          <i className="fa fa-gear"/><i className="fa fa-angle-down ml-2"/>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={Link} to={"/event/" + item.id}>
            <i className="fa fa-fw fa-edit mr-2"/>
            Edit
          </DropdownItem>
          <DropdownItem onClick={() => setMarkDelete(item.id)}>
            <i className="fa fa-fw fa-remove mr-2"/>
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <ConfirmationModal isOpen={markDelete !== null} onDelete={() => deleteItem()} onCancel={() => setMarkDelete(null)}/>
    </>
  );
};

ToolbarAction.propTypes = {
  item: PropTypes.object,
};

export default ToolbarAction;
