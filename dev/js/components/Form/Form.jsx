import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  // Default props go here
};


export default function Form(props) {
  const { className, handleSubmit, children } = props;

  const submitHandler = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  const formClasses = classNames('ui form', className);

  return (
    <form
      className={formClasses}
      onSubmit={submitHandler}
    >
      {children}
    </form>
  );
}

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;
