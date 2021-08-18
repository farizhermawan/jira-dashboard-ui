import React, {useEffect, useState} from 'react';
import {CardBody, Table} from "reactstrap";
import PropTypes from "prop-types";
import ReactEmptyState from '@jswork/react-empty-state';

import {Card} from "components";
import {SharedStateContext} from "contexts/sharedState";
import DataService from "services/DataService";

import {PaginationBuilder} from "./PaginationBuilder";

const ManagedTable = ({header, body, api, data, children, pagination, params}) => {
  const [response, setResponse] = useState(null);
  const [items, setItems] = useState([]);
  const [unsortedItems, setUnsortedItems] = useState([]);
  const [totalItem, setTotalItem] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [pageInfo, setPageInfo] = useState({currentPage: 1, perPage: 15});

  const loadItems = () => {
    if (typeof data !== 'undefined') {
      setItems(data);
    } else {
      let queryParam = pagination ? {page: pageInfo.currentPage, limit: pageInfo.perPage} : {limit: -1};
      DataService.get(api, {...queryParam, ...params}).then((response) => {
        if (!response.error) {
          setResponse(response);
          setItems(response.data);
          setUnsortedItems(response.data);
          if (pagination) setTotalItem(response.total);
        }
        setLoaded(true);
      });
    }
  };

  const onPageChange = (perPage, currentPage) => {
    setPageInfo({perPage: perPage, currentPage: currentPage});
  }

  const doFilter = (filterFn) => {
    let filteredItems = response.data.filter(filterFn);
    setItems(filteredItems);
    setUnsortedItems(filteredItems);
  }

  const doSort = (sortFn) => {
    let copiedItems = [...unsortedItems];
    console.log(copiedItems);
    if (sortFn !== null) copiedItems.sort(sortFn);
    console.log(copiedItems);
    setItems(copiedItems);
  }

  useEffect(() => loadItems(), [pageInfo]);

  return (
    <SharedStateContext.Provider value={{
      response,
      items,
      refresh: () => loadItems(),
      filter: (filterFn) => doFilter(filterFn),
      sort: (sortFn) => doSort(sortFn),
      loaded,
    }}>
      {children}
      <Card className="mb-3">
        {items.length === 0 ?
          <CardBody>
            <ReactEmptyState title="No Data" />
          </CardBody> :
          <>
            <Table className="mb-0" responsive>
              <thead>{header}</thead>
              <tbody>{body}</tbody>
            </Table>
            {pagination && <PaginationBuilder itemSize={totalItem} onPageChange={onPageChange} />}
          </>
        }
      </Card>
    </SharedStateContext.Provider>
  );
};

ManagedTable.defaultProps = {
  header: <></>,
  body: <></>,
  children: <></>,
  pagination: true,
  params: {},
};

ManagedTable.propTypes = {
  api: PropTypes.string,
  data: PropTypes.array,
  header: PropTypes.object,
  body: PropTypes.object,
  children: PropTypes.node,
  pagination: PropTypes.bool,
  params: PropTypes.object,
}

export {ManagedTable};
