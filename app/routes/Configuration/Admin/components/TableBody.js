import React from 'react';
import Skeleton from "react-loading-skeleton";

import {useSharedState} from "contexts/sharedState";

import ToolbarAction from "./ToolbarAction";

const TableBody = () => {

  const {items, loaded} = useSharedState();

  if (!loaded) {
    return (
      <tr>
        <td className="align-middle"><Skeleton count={2} /></td>
        <td className="align-middle"><Skeleton count={2} /></td>
        <td className="align-middle"><Skeleton count={2} /></td>
      </tr>
    );
  }

  return (
    <React.Fragment>
      {
        items.length === 0
          ? (<tr><td colSpan={4} className="align-middle text-center">- Empty -</td></tr>)
          : items.map((item, index) => (
          <tr key={index}>
            <td className="align-middle">{item.email}</td>
            {item.full_name == null
            ? <td className="align-middle text-center"><i>Pending</i></td>
            : <td className="align-middle">{item.full_name}</td>
            }
            <td className="align-middle text-right">
              <ToolbarAction item={item}/>
            </td>
          </tr>
        ))
      }
    </React.Fragment>
  );
};

export default TableBody;
