import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Button.module.css';

const Button = forwardRef(({
  type,
  disabled,
  onClick,
  className,
  children,
  ...props
}, ref) => {
  const innerRef = useRef(null);

  const getFocus = () => {
    innerRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: getFocus,
  }));

  return (
    <button
      ref={innerRef}
      type={type}
      className={classNames(styles.button, className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: null,
  className: '',
  children: null,
};

export default Button;
