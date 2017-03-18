import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  // Default props go here
};

export default function Icon(props) {
  const { type, className } = props;

  const iconClass = classNames(type, 'icon', className);

  return (
    <i className={iconClass}>
    </i>
  );
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
