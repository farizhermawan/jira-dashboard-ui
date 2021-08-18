import React from "react";

import Sortable from "routes/components/CRUD/Sortable";
import {useSharedState} from "contexts/sharedState";

const TableHeader = () => {

  const {sort} = useSharedState();

  const onSort = (sortBy) => {
    if (sortBy === null) sort(null);
    else {
      let key = sortBy.split("-")[0];
      let dir = sortBy.split("-")[1] === 'asc' ? 1 : -1;
      sort((a, b) => a[key] >= b[key] ? 1 * dir : -1 * dir)
    }
  }

  return (
    <Sortable.TR onSort={(sortBy) => onSort(sortBy)}>
        <Sortable.TH field="issue_key" className="align-middle bt-0">Summary</Sortable.TH>
        <Sortable.TH field="total_original_estimate" className="align-middle bt-0">Original Est.</Sortable.TH>
        <Sortable.TH field="total_remaining_estimate" className="align-middle bt-0">Remaining Est.</Sortable.TH>
        <Sortable.TH field="total_time_spent" className="align-middle bt-0">Time Spent</Sortable.TH>
        <th className="align-middle bt-0"> </th>
    </Sortable.TR>
  );
}

export default TableHeader;
