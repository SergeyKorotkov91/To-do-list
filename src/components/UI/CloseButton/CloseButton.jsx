import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import { CloseIcon } from '../../icons';
import { classNames } from '../../../utils';
import styles from './CloseButton.module.css';

const CloseButton = forwardRef(({
  onClick, color, className, ...props
}, ref) => {
  const innerRef = useRef(null);

  const getFocus = () => {
    innerRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: getFocus,
  }));

  return (
    <Button
      ref={innerRef}
      className={classNames(styles.button, className)}
      disabled={false}
      onClick={onClick}
      {...props}
    >
      <CloseIcon
        aria-hidden="true"
        focusable="false"
        color={color}
        className={styles.button__icon}
      />
    </Button>
  );
});

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

CloseButton.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default CloseButton;
