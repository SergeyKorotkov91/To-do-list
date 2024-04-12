import React from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../utils';
import styles from './Overlay.module.css';

function Overlay({ onClick, children, className }) {
  return (
    <div
      role="none"
      className={classNames(styles.overlay, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

Overlay.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  className: '',
};

export default Overlay;
