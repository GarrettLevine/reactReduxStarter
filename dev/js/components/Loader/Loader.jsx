import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  inverted: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Loading',
};

/* UI Loader
* isLoading - boolean to determin where the loader should be running
* inverted - shows a black background if inverted
* className - extra className for the parent container
* size - the size of the loader
* text - text for the loader
*/

export default function Loader(props) {
  const { isLoading, className, inverted, size, text } = props;

  const containerClass = classNames('ui segment', className);

  const isVisible = classNames('ui', {
    active: isLoading,
    disabled: !isLoading,
    inverted: inverted, 
  }, 'dimmer') 

  const loaderClass = classNames('ui', size, 'text loader');

  return (
    <div className={containerClass}>
      <div className={isVisible}>
        <div className={loaderClass}>{text}</div>
      </div>
      <p></p>
    </div>
  );
}

Loader.propTypes = propTypes;
Loader.defaultProps = defaultProps;
