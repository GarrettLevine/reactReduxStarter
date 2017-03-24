import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  handleChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const defaultProps = {
  placeholder: '',
  value: '',
  label: '',
};

export default function Input(props) {
  const {
    id,
    label,
    type,
    value,
    placeholder,
    className,
    handleChange,
  } = props;

  const changeHandler = (e) => {
    handleChange(e);
  };

  const inputClass = classNames('field', className);

  return (
    <div className={inputClass}>
      <label
        for={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={id}
        value={value}
        placeholder={placeholder}
        onChange={changeHandler}
      />
    </div>
  );
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;
