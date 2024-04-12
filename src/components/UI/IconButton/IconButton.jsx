import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import styles from './IconButton.module.css';

function IconButton({ onClick, children, ...props }) {
  return (
    <Button
      onClick={onClick}
      className={styles.button}
      {...props}
    >
      {children}
    </Button>
  );
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

IconButton.defaultProps = {
  onClick: () => {},
  children: null,
};

export default IconButton;
