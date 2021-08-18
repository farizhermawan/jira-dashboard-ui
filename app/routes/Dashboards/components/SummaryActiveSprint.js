import React, {useEffect, useState} from "react";
import {Badge, Nav, NavItem, NavLink, Progress} from "reactstrap";

import {timeFriendly} from "utils/formatter";
import DataService from "services/DataService";

const SummaryActiveSprint = () => {
  const summaryStats = [
    {group: 'To Do', states: ['To Do'], color: 'dark'},
    {group: 'In Progress', states: ['In Progress', 'In Review', 'READY FOR PROD', 'READY FOR STG'], color: 'primary'},
    // {group: 'In Review', states: ['In Review'], color: 'primary'},
    // {group: 'Ready to Deploy', states: ['READY FOR PROD', 'READY FOR STG'], color: 'primary'},
    {group: 'Done', states: ['Done', "Won't Do"], color: 'info'},
  ];

  const [response, setResponse] = useState();
  const [overallStats, setOverallStats] = useState({remaining_estimate: 0, time_spent: 0, original_estimate: 0});

  const getTotalStats = (key) => {
    if (!response) return '...';
    let total = 0;
    Object.entries(response.stats).forEach(item => {
      total += item[1][key];
    });
    return total;
  }

  const getOverallProgress = () => {
    let progress = Math.round(overallStats.time_spent / (overallStats.time_spent + overallStats.remaining_estimate) * 100);
    if (isNaN(progress)) return <Progress value={0} color="info" className="mt-0 font-weight-bold">0%</Progress>;
    return <Progress value={progress} color="info" className="mt-0 font-weight-bold">{progress}%</Progress>;
  }

  const init = async () => {
    setResponse(await DataService.get("/v1/issues"));
  };

  useEffect(() => {
    if (!response) return;
    let remaining_estimate = getTotalStats('remaining_estimate');
    let time_spent = getTotalStats('time_spent');
    let original_estimate = getTotalStats('original_estimate');
    setOverallStats({
      remaining_estimate: remaining_estimate,
      time_spent: time_spent,
      original_estimate: original_estimate,
    });
  }, [response]);

  useEffect(() => {
    init();
  }, []);
  return <>
    <div className="d-flex mb-0">
      <p>Summary:</p>
      <p className="ml-auto text-inverse">
        <Badge color="info" className="mr-1">Spent: {timeFriendly(overallStats.time_spent)}</Badge>
        <Badge color="warning" className="mr-1">Remaining: {timeFriendly(overallStats.remaining_estimate)}</Badge>
        <Badge color="primary" className="mr-1">Total:{' '}
          {overallStats.original_estimate !== (overallStats.remaining_estimate + overallStats.time_spent) &&
            <strike className="mr-1">{timeFriendly(overallStats.original_estimate)}</strike>
          }
          {timeFriendly(overallStats.remaining_estimate + overallStats.time_spent)}
        </Badge>
      </p>
    </div>
    {getOverallProgress()}
    <hr/>
    <Nav pills className="nav-justified">
      {summaryStats.map((item, index) => {
        let count = "...";
        if (response) {
          count = 0;
          item.states.forEach((state) => {
            let stats = response.stats[state];
            if (typeof stats !== 'undefined') count += stats.issues;
          })
        }
        return (
          <NavItem key={index}>
            <NavLink>
              <p className="text-center mb-0">
                <i className={"fa fa-circle mr-2 text-" + item.color}/> {item.group}
              </p>
              <h4 className={"mt-2 mb-0"}>
                {count}
              </h4>
            </NavLink>
          </NavItem>
        )
      })}
    </Nav>
  </>
}

export default SummaryActiveSprint;
