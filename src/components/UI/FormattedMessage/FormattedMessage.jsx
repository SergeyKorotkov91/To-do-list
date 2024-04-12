import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './FormattedMessage.module.css';

function FormattedMessage({ hasError, children, className }) {
  if (hasError === false) {
    return null;
  }

  return (
    <div className={classNames(styles.message, className)}>
      <p className={styles.message__text}>
        {children}
      </p>
    </div>
  );
}

FormattedMessage.propTypes = {
  hasError: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FormattedMessage.defaultProps = {
  className: '',
};

export default FormattedMessage;
