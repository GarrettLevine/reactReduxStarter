import React, { Component, PropTypes } from 'react';

const propTypes = {
  // proptypes go here
};

const defaultProps = {
  // Default props go here
};

export default function App(props) {
  return (
    <h1 className="ui header red">This is the APP! It works, gosh</h1>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

