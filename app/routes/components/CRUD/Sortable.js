import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import {SharedStateContext, useSharedState} from "contexts/sharedState";

const SortableTableRow = ({onSort, children}) => {

  const [sortBy, setSortBy] = useState(null);

  const doSort = (key, type) => {
    if (key === null) setSortBy(null);
    else setSortBy(key + '-' + type);
  }

  useEffect(() => {
    onSort(sortBy);
  }, [sortBy]);

  return <SharedStateContext.Provider value={{
    unsort: () => doSort(null, null),
    sort: (key, type) => doSort(key, type),
    sortState: sortBy
  }}>
    <tr>
      {children}
    </tr>
  </SharedStateContext.Provider>;
};

const SortableTableHead = ({field, className, children, text}) => {

  const [state, setState] = useState(0);
  const {unsort, sort, sortState} = useSharedState();

  const getIcon = () => {
    if (state === 1) return <i className='fa fa-sort-asc'/>
    if (state === -1) return <i className='fa fa-sort-desc'/>
    return '';
  };

  const onClick = () => {
    if (state === -1) unsort();
    else sort(field, state === 0 ? 'asc' : 'desc');
  }

  useEffect(() => {
    if (sortState !== null) {
      let state = sortState.split("-");
      if (state[0] === field) {
        setState(state[1] === 'asc' ? 1 : -1);
        return;
      }
    }
    setState(0);
  }, [sortState]);

  return <th onClick={() => onClick()} style={{cursor: "pointer"}} className={className}>{children || text || ''}{getIcon()}</th>
};

SortableTableRow.propTypes = {
  onSort: PropTypes.func,
  children: PropTypes.node,
}

SortableTableHead.propTypes = {
  field: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  text: PropTypes.string,
}

const Sortable = {
  TR: SortableTableRow,
  TH: SortableTableHead,
}

export default Sortable;
