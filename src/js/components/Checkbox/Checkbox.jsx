import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
};

const defaultProps = {
  value: false,
  label: '',
};

export default function Input(props) {
  const {
    id,
    label,
    value,
    className,
    handleChange,
  } = props;

  const changeHandler = (e) => {
    handleChange(e);
  };

  const checkboxClassname = classNames('field', className);

  return (
    <div className={checkboxClassname}>
      <div className="ui checkbox">
        <input
          id={id}
          type="checkbox"
          name={id}
          value={value}
          onChange={changeHandler}
        />
        <label
          for={id}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
