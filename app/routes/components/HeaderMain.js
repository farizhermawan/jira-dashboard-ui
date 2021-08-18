import React from 'react';
import PropTypes from 'prop-types';

const HeaderMain = (props) => (
  <React.Fragment>
    { /* START H1 Header */}
    <div className={` ${props.className}`}>
      <h1 className="display-4 mr-3 mb-0 align-self-start">
        {props.title}
      </h1>
      <h4>{props.subtitle}</h4>
    </div>
    { /* END H1 Header */}
  </React.Fragment>
)
HeaderMain.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string
};
HeaderMain.defaultProps = {
  title: "Loading...",
  subtitle: "",
  className: "my-4"
};

export {HeaderMain};
