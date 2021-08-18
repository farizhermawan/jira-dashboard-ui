import React from 'react';
import PropTypes from 'prop-types';
import {Media} from "components";

const NotificationBody = (props) => (
  <Media>
    <Media middle left className="mr-3">
      <i className={"fa fa-fw fa-2x " + props.icon}/>
    </Media>
    <Media body>
      <p>{props.text}</p>
    </Media>
  </Media>
);

NotificationBody.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

NotificationBody.defaultProps = {
  icon: "fa-check",
};

export {NotificationBody};
