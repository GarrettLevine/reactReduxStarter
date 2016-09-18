import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  columns: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

const defaultProps = {
  className: '',
};

export default function Grid(props) {
  const { columns, className, children } = props;

  const gridClass = classNames('ui', columns, 'column grid', className);

  return (
    <div
      className={gridClass}
    >
      {children}
    </div>
  );
}

Grid.propTypes = propTypes;
Grid.defaultProps = defaultProps;
