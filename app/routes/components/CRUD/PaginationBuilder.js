import React, {useEffect, useState} from 'react';
import {CardFooter, Pagination, PaginationItem, PaginationLink} from "components";
import PropTypes from "prop-types";
import {Col, CustomInput, Row} from "reactstrap";

const range = (start, end) => {
  return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const PaginationBuilder = ({itemSize, maxPage, onPageChange}) => {

  if (itemSize === 0) return <></>;

  const template = {
    first: 'First',
    last: 'Last',
  }

  const firstPage = 1;
  const optionPerPage = [10, 15, 25, 50, 100];
  const defaultPerPage = 15;

  const [loaded, setLoaded] = useState(false);
  const [perPage, setPerPage] = useState(defaultPerPage);
  const [totalPage, setTotalPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [displayablePages, setDisplayablePages] = useState([]);

  const goToPreviousPage = () => {
    const firstDisplayablePage = displayablePages[0];
    generateDisplayablePages(firstDisplayablePage - maxPage);
    setCurrentPage(firstDisplayablePage - 1);
  }

  const goToNextPage = () => {
    const lastDisplayablePage = displayablePages[maxPage - 1];
    generateDisplayablePages(lastDisplayablePage + 1);
    setCurrentPage(lastDisplayablePage + 1);
  }

  const goToFirstPage = () => {
    generateDisplayablePages(firstPage);
    setCurrentPage(firstPage);
  }

  const goToLastPage = () => {
    generateDisplayablePages(totalPage - maxPage + 1);
    setCurrentPage(totalPage);
  }

  const generateDisplayablePages = (start) => {
    if (totalPage === null) return;
    let end = start + maxPage - 1;
    if (end > totalPage) {
      end = totalPage;
      start = totalPage - maxPage + 1;
    }
    if (start < firstPage) {
      start = firstPage;
      end = firstPage + maxPage - 1;
    }
    const pages = range(start, end > totalPage ? totalPage : end);
    setDisplayablePages(pages);
  }

  const handlePerPageChange = (e) => {
    const value = e.target.value;
    setPerPage(value);
  }

  const showQuickPreviousButton = () => displayablePages.indexOf(firstPage) === -1;
  const showQuickNextButton = () => displayablePages.indexOf(totalPage) === -1;

  useEffect(() => {
    setTotalPage(Math.ceil(itemSize/perPage));
    if (currentPage === firstPage) {
      if (loaded) onPageChange(perPage, currentPage);
    }
    else setCurrentPage(firstPage);
  }, [perPage]);

  useEffect(() => {
    generateDisplayablePages(displayablePages.length > 1 ? displayablePages[0] : firstPage);
  }, [totalPage]);

  useEffect(() => {
    if (loaded) onPageChange(perPage, currentPage);
  }, [currentPage]);

  useEffect(() => {
    setLoaded(true);
    goToFirstPage();
  }, []);

  return (
    <>
      <CardFooter>
        <Row>
          <Col md={4} xl={3} className="d-none d-md-block">
            <CustomInput type="select" id="perPage" bsSize="sm" value={perPage} onChange={handlePerPageChange}>
              {optionPerPage.map((item) => <option key={item} value={item}>{item} records per page</option>)}
            </CustomInput>
          </Col>
          <Col md={8} xl={9} className="d-flex">
            <Pagination className="ml-auto">
              {
                showQuickPreviousButton() &&
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => goToFirstPage()}>
                      {template.first}
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next onClick={() => goToPreviousPage()}>
                      ...
                    </PaginationLink>
                  </PaginationItem>
                </>
              }
              {
                displayablePages.map((page) => (
                  <PaginationItem key={page} active={currentPage === page}>
                    <PaginationLink onClick={() => currentPage !== page && setCurrentPage(page)}>{page}</PaginationLink>
                  </PaginationItem>
                ))
              }
              {
                showQuickNextButton() &&
                <>
                  <PaginationItem>
                    <PaginationLink next onClick={() => goToNextPage()}>
                      ...
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => goToLastPage()}>
                      {template.last}
                    </PaginationLink>
                  </PaginationItem>
                </>
              }
            </Pagination>
          </Col>
        </Row>
      </CardFooter>
    </>
  );
};

PaginationBuilder.defaultProps = {
  onPageChange: () => {},
  maxPage: 5,
};

PaginationBuilder.propTypes = {
  itemSize: PropTypes.number,
  maxPage: PropTypes.number,
  onPageChange: PropTypes.func,
}

export {PaginationBuilder};
