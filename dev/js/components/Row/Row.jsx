import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  column: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  // Default props go here
};

export default function Row(props) {
  const { className, column, children } = props;

  const rowClass = classNames(column, 'column row', className);

  return (
    <div
      className={rowClass}
    >
      {children}
    </div>
  );
}

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;
