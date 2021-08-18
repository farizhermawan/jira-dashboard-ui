import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {ThemeConsumer} from '../../../components/Theme';

const logos = {
  'gpf': require('./../../../images/logos/logo.png'),
}

const getLogoUrl = (style, color) => {
  return logos['gpf'];
}

// Check for background
const getLogoUrlBackground = (style, color) => {
  if (style === 'color') {
    return logos['gpf'];
  } else {
    return getLogoUrl(style, color);
  }
};

const LogoThemed = ({checkBackground, className, ...otherProps}) => (
  <ThemeConsumer>
    {
      ({style, color}) => (
        <img
          src={
            checkBackground ?
              getLogoUrlBackground(style, color) :
              getLogoUrl(style, color)
          }
          className={classNames('d-block', className)}
          alt="Logo"
          {...otherProps}
        />
      )
    }
  </ThemeConsumer>
);

LogoThemed.propTypes = {
  checkBackground: PropTypes.bool,
  className: PropTypes.string,
};

LogoThemed.defaultProps = {
  height: 30
};

export {LogoThemed};
