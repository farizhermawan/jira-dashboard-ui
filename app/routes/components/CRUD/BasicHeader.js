import React from 'react';
import {Media} from "reactstrap";
import PropTypes from 'prop-types';

const BasicHeader = (props) => (
  <Media className={`mb-3 ${props.className}`}>
    {props.no ? (
      <Media left top>
        <h1 className="mr-3 display-4 text-muted">
          {props.no}.
        </h1>
      </Media>
    ) : ''}
    <Media body className="d-flex flex-column flex-md-row mb-3 mb-md-0">
      <h4 className="mt-1 mr-auto d-flex align-items-center">
        {props.title}
      </h4>
      {props.toolbar}
    </Media>
  </Media>
);

BasicHeader.propTypes = {
  no: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  title: PropTypes.string,
  toolbar: PropTypes.node,
  className: PropTypes.string
};

BasicHeader.defaultProps = {
  title: 'Title',
};

export {BasicHeader};
