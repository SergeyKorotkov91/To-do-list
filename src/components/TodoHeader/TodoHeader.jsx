import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../utils';
import styles from './TodoHeader.module.css';

function TodoHeader({ className, children }) {
  return (
    <h1 className={classNames(styles.header, className)}>
      {children}
    </h1>
  );
}

TodoHeader.defaultProps = {
  className: '',
  children: 'Todo Header',
};

TodoHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default TodoHeader;
