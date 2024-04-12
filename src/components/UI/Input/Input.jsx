import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Input.module.css';

const Input = forwardRef((props, ref) => {
  const {
    type = 'text', hasError = false, className, ...other
  } = props;
  const innerRef = useRef(null);

  const inputClass = classNames(
    styles.input,
    hasError && styles.input_error,
    className,
  );

  const getFocus = () => {
    innerRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: getFocus,
  }));

  return (
    <input
      type={type}
      ref={innerRef}
      className={inputClass}
      {...other}
    />
  );
});

Input.propTypes = {
  type: PropTypes.string,
  hasError: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  hasError: false,
  className: '',
};

export default Input;
