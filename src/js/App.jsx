import React, { Component, PropTypes } from 'react';

import './App.scss';

const propTypes = {
  // proptypes go here
};

const defaultProps = {
  // Default props go here
};

export default class App extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <h1 className="whatever ui header green">This is the APP! It works, gosh</h1>
    );
  }
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

