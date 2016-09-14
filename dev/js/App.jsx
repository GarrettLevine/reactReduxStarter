import React, { PropTypes } from 'react';

const propTypes = {
  // proptypes go here
};

const defaultProps = {
  // Default props go here
};

export default function App(props) {
  return (
    <h1 className="appHeader">This is the APP!</h1>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

