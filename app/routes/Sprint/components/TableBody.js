import React from 'react';
import Skeleton from "react-loading-skeleton";

import {useSharedState} from "contexts/sharedState";
import {Badge} from "reactstrap";
import {Link} from "react-router-dom";

const TableBody = () => {

  const {items, loaded} = useSharedState();

  if (!loaded) {
    return (
      <tr>
        <td className="align-middle"><Skeleton count={2} /></td>
        <td className="align-middle"><Skeleton count={2} /></td>
        <td className="align-middle"><Skeleton count={2} /></td>
        <td className="align-middle"><Skeleton count={2} /></td>
      </tr>
    );
  }

  const getBadgeColor = (state) => {
    if (state === 'active') return 'info';
    if (state === 'future') return 'secondary';
    return 'dark';
  }
  return (
    <React.Fragment>
      {
        items.length === 0
          ? (<tr><td colSpan={4} className="align-middle text-center">- Empty -</td></tr>)
          : items.map((item, index) => (
          <tr key={index}>
            <td className="align-middle"><Link to={"/sprint/" + item.id}>{item.name}</Link></td>
            <td className="align-middle">{item.start_date}</td>
            <td className="align-middle">{item.end_date}</td>
            <td className="align-middle">
              <Badge color={getBadgeColor(item.state)}>{item.state}</Badge>
            </td>
          </tr>
        ))
      }
    </React.Fragment>
  );
};

export default TableBody;
