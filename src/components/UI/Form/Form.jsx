import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Form.module.css';

function Form({ className, children, ...other }) {
  return (
    <form
      className={classNames(styles.form, className)}
      {...other}
    >
      {children}
    </form>
  );
}

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Form;
