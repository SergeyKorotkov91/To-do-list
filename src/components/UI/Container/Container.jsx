import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Container.module.css';

function Container({ className, children }) {
  return (
    <div className={classNames(styles.container, className)}>
      {children}
    </div>
  );
}

Container.defaultProps = {
  className: '',
  children: null,
};

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
