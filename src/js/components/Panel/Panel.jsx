import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  visible: PropTypes.bool,
  direction: PropTypes.string,
  menu: PropTypes.bool,
};

const defaultProps = {
  direction: 'left',
};

export default function Panel(props) {
  const { className, menu, children, direction, visible } = props;

  const sidebarClass = classNames('ui sidebar', direction, className, {
    visible,
    menu,
  });

  return (
    <div className={sidebarClass}>
      {children}
    </div>
  );
}

Panel.propTypes = propTypes;
Panel.defaultProps = defaultProps;
