import React from 'react';
import PropTypes from 'prop-types';
import {CardBody} from "reactstrap";
import {Card} from "components";
import Skeleton from "react-loading-skeleton";

const DefaultLoadingCard = ({count}) => (
  <Card className="mt-3 mb-3">
    <CardBody>
      <Skeleton count={count}/>
    </CardBody>
  </Card>
);

DefaultLoadingCard.defaultProps = {
  count: 2
};

DefaultLoadingCard.propTypes = {
  count: PropTypes.number,
};

export {DefaultLoadingCard};
