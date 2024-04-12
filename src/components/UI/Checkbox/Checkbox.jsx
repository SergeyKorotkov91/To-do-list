import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Checkbox.module.css';

function Checkbox({
  name,
  label,
  value,
  onChange,
  className,
  ...props
}) {
  return (
    <label htmlFor={name} className={classNames(styles.checkbox, className)}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={value}
        aria-checked={value}
        onChange={onChange}
        className={styles.checkbox__input}
        {...props}
      />
      <span className={styles.checkbox__mark} aria-hidden="true" />
      <span className={styles.checkbox__text} aria-hidden="true">
        {label}
      </span>
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

Checkbox.defaultProps = {
  label: '',
  value: true,
  onChange: () => {},
  className: '',
};

export default Checkbox;
