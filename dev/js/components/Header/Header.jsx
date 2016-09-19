import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  icon: PropTypes.node,
};

const defaultProps = {
  // Default props go here
};

export default function Header(props) {
  const { className, type, heading, subHeading } = props;

  const headerClass = classNames('ui header', {
    icon: (type === 'icon'),
    sub: (type === 'sub-header'),
  }, className);

  const renderHeader = (headerType) => {
    switch (headerType) {
      case 'icon': {
        return (
          <h2 className={headerClass}>
            {icon}
            <div className="content">
              {heading}
              <div className="sub header">{subHeading}</div>
            </div>
          </h2>
        );
      }
      case 'sub-header': {
        <h2 className={headerClass}>
          {heading}
        </h2>
      }
      default: {
        return (
          <h2 className={headerClass}>
            {heading}
          </h2>
        );
      }
    }
  };
  
  return (
    <span>
      {renderHeader()}
    </span>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
