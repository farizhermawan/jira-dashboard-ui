import React from 'react';
import PropTypes from 'prop-types';
import {Col, Fade, Row} from "reactstrap";
import {Alert} from "components";

const DefaultError = ({error}) => (
  error ? <Fade in={error}>
    <Row>
      <Col sm={12}>
        <Alert color="danger">
          <i className="fa fa-times-circle mr-1 alert-icon"/>
          <strong className="alert-heading">{error.title || ''}</strong>
          <p className="mb-0">{error.message || ''}</p>
        </Alert>
      </Col>
    </Row>
  </Fade> : ''
);

DefaultError.propTypes = {
  error: PropTypes.object,
};

export {DefaultError};
