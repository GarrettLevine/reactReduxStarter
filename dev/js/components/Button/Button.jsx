import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
  handleClick: PropTypes.func,
  type: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  text: '',
};

/* Button Component
* className - a string of an extra class for the button
* children - any children to be passed into the button. This changes based on the style of button.
* icon - some buttons except an Icon node
* handleClick - a function to execute when the button is clicked
* type - the style of button to render based on semantic ui
* text - some button styles accept a text prop
*/

export default function Button(props) {
  const {
    className,
    children,
    handleClick,
    type,
    text,
    icon,
  } = props;

  const buttonClass = classNames('ui button', className, {
    icon: (type === 'icon'),
    'left labeled': (type === 'left-labeled'),
    'right labeled': (type === 'right-labeled'),
    'labeled icon': (type === 'left-labeled-icon'),
    'right labeled icon': (type === 'right-labeled-icon'),
  });

  const clickHandler = () => {
    handleClick();
  };

  const renderButton = buttonType => {
    switch (buttonType) {
      case 'icon': {
        return (
          <button className={buttonClass}>
            {children}
          </button>
        );
      }
      case 'left-labeled': {
        return (
          <div className={buttonClass}>
            <a className="ui basic label">
              {text}
              {children}
            </a>
            <div className="ui icon button">
              {icon}
            </div>
          </div>
        );
      }
      case 'right-labeled': {
        return (
          <div className={buttonClass}>
            <div className="ui icon button">
              {children}
            </div>
            <a className="ui basic label">
              {text}
            </a>
          </div>
        );
      }
      case 'right-labeled-icon': {
        return (
          <button className={buttonClass}>
            {icon}
            {text}
            {children}
          </button>
        );
      }
      case 'left-labeled-icon': {
        return (
          <button className={buttonClass}>
            {icon}
            {text}
            {children}
          </button>
        );
      }
      default: {
        return (
          <button
            className={buttonClass}
            onClick={clickHandler}
          >
            {children}
            {text}
          </button>
        );
      }
    }
  };

  return (
    <span>
      {renderButton(type)}
    </span>
  );
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;