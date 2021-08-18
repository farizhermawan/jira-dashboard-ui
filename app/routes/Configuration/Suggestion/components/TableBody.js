import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledButtonDropdown,
} from 'components';

import DataService from "services/DataService";

const TableBody = () => {
  const [items, setItems] = useState([]);

  const loadItems = () => {
    DataService.get("/v1/suggestion-groups").then((response) => {
      if (!response.error) setItems(response);
    });
  };

  useEffect(() => loadItems(), []);

  return (
    <React.Fragment>
      {
        items.length === 0
          ? (<tr><td colSpan={4} className="align-middle text-center">Data Kosong</td></tr>)
          : items.map((item, index) => (
          <tr key={index}>
            <td className="align-middle">{item.group}</td>
            <td className="align-middle">{item.total} item(s)</td>
            <td className="align-middle text-right">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="text-decoration-none">
                  <i className="fa fa-gear"/><i className="fa fa-angle-down ml-2"/>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to={"/config/suggestion/" + item.group}>
                    <i className="fa fa-fw fa-edit mr-2"/>
                    Kelola
                  </DropdownItem>
                  <DropdownItem tag={Link} to={"/config/suggestion/" + item.group + "/order"}>
                    <i className="fa fa-fw fa-sort-alpha-asc mr-2"/>
                    Urutkan
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </td>
          </tr>
        ))
      }
    </React.Fragment>
  );
};

export default TableBody;
