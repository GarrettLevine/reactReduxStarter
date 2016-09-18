import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  columns: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  // Default props go here
};

export default function Column(props) {
  const { className, columns, children } = props;

  const columnClass = classNames(columns, 'wide column', className);

  return (
    <div className={columnClass}>
      {children}
    </div>
  );
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;
