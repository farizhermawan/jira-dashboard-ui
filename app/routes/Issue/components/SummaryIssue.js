import React from "react";
import {Badge, Progress} from "reactstrap";
import PropTypes from "prop-types";

import {timeFriendly} from "utils/formatter";

const SummaryIssue = ({stats}) => {

  const getOverallProgress = () => {
    let progress = Math.round(stats.time_spent / (stats.time_spent + stats.remaining_estimate) * 100);
    if (isNaN(progress)) return <Progress value={0} color="info" className="mt-0 font-weight-bold">0%</Progress>;
    return <Progress value={progress} color="info" className="mt-0 font-weight-bold">{progress}%</Progress>;
  }

  return <>
    <div className="d-flex mb-0">
      <p>Summary:</p>
      <p className="ml-auto text-inverse">
        <Badge color="info" className="mr-1">Spent: {timeFriendly(stats.time_spent)}</Badge>
        <Badge color="warning" className="mr-1">Remaining: {timeFriendly(stats.remaining_estimate)}</Badge>
        <Badge color="primary" className="mr-1">Total:{' '}
          {stats.original_estimate !== (stats.remaining_estimate + stats.time_spent) &&
            <strike className="mr-1">{timeFriendly(stats.original_estimate)}</strike>
          }
          {timeFriendly(stats.remaining_estimate + stats.time_spent)}
        </Badge>
      </p>
    </div>
    {getOverallProgress()}
  </>
}

SummaryIssue.propTypes = {
  stats: PropTypes.object
};

export default SummaryIssue;
