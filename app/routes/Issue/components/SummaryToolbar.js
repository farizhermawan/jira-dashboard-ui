import React, {useEffect, useState} from "react";
import {Nav, NavItem, NavLink} from "reactstrap";

import {useSharedState} from "contexts/sharedState";
import SummaryIssue from "./SummaryIssue";

const SummaryToolbar = () => {
  const summaryStats = [
    {group: 'To Do', states: ['To Do'], color: 'dark'},
    {group: 'In Progress', states: ['In Progress'], color: 'primary'},
    {group: 'In Review', states: ['In Review'], color: 'primary'},
    {group: 'Ready to Deploy', states: ['READY FOR PROD', 'READY FOR STG'], color: 'primary'},
    {group: 'Done', states: ['Done', "Won't Do"], color: 'info'},
  ];

  const {response, filter} = useSharedState();
  const [selectedGroup, setSelectedGroup] = useState(summaryStats[0].group);
  const [overallStats, setOverallStats] = useState({remaining_estimate: 0, time_spent: 0, original_estimate: 0});

  const getTotalStats = (key) => {
    if (!response) return '...';
    let total = 0;
    Object.entries(response.stats).forEach(item => {
      total += item[1][key];
    });
    return total;
  }

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
    if (!response) return;
    let rules = summaryStats.filter(a => a.group === selectedGroup)[0].states;
    filter((item) => rules.indexOf(item.state) !== -1);
  }, [selectedGroup, response]);

  return <>
    <SummaryIssue stats={overallStats}/>
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
            <NavLink href="#" onClick={() => setSelectedGroup(item.group)} active={selectedGroup === item.group}>
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
    <hr/>
  </>
}

export default SummaryToolbar;
