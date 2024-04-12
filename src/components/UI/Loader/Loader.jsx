import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Loader.module.css';

function Loader({ type }) {
  const loaderClass = type.length > 0 ? styles[`loader_${type}`] : '';

  return (
    <div className={classNames(styles.loader, loaderClass)} />
  );
}

Loader.propTypes = {
  type: PropTypes.string,
};

Loader.defaultProps = {
  type: '',
};

export default Loader;
