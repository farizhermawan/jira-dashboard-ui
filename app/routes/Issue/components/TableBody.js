import React from 'react';
import {UncontrolledTooltip} from "reactstrap";
import {Link} from "react-router-dom";

import {useSharedState} from "contexts/sharedState";
import {timeFriendly} from "utils/formatter";

const TableBody = () => {

  const {items} = useSharedState();

  const buildStoryTitle = (item) => {
    let icon = "fa-check-square text-primary";
    if (item.type === 'Story') icon = "fa-book text-info";
    else if (item.type === 'Bug') icon = "fa-bug text-danger";

    let summary = item.summary.length > 90 ? item.summary.substr(0, 87) : item.summary;

    return <>
      <i className={"mr-2 fa " + icon} /> [{item.issue_key}] {summary}
      {item.summary.length > 90 &&
        <>
          <span id={"issue-" + item.id}>...</span>
          <UncontrolledTooltip placement="bottom" target={"issue-" + item.id}>
            {item.summary}
          </UncontrolledTooltip>
        </>
      }
    </>
  }

  return (
    <React.Fragment>
      {
        items.length === 0
          ? (<tr><td colSpan={4} className="align-middle text-center">- Empty -</td></tr>)
          : items.map((item, index) => (
          <tr key={index}>
            <td className="align-middle">
              <Link to={"/issue/" + item.id}>
                {buildStoryTitle(item)}
              </Link>
            </td>
            <td className="align-middle text-right">{timeFriendly(item.total_original_estimate)}</td>
            <td className="align-middle text-right">{timeFriendly(item.total_remaining_estimate)}</td>
            <td className="align-middle text-right">{timeFriendly(item.total_time_spent)}</td>
            <td className="align-middle text-right">
              <a href={"https://29022131.atlassian.net/browse/" + item.issue_key} target="_blank" rel="noreferrer">
                <i className="fa fa-external-link"/>
              </a>
            </td>
          </tr>
        ))
      }
    </React.Fragment>
  );
};

export default TableBody;
