import React from 'react';
import PropTypes from 'prop-types';

function DeleteIcon({ color, className, ...props }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M21 4h-3.1A5.01 5.01 0 0013 0h-2a5.009 5.009 0 00-4.9 4H3a1 1 0 000 2h1v13a5.006 5.006 0 005 5h6a5.006 5.006 0 005-5V6h1a1 1 0 100-2zM11 2h2a3.006 3.006 0 012.829 2H8.171A3.006 3.006 0 0111 2zm7 17a3 3 0 01-3 3H9a3 3 0 01-3-3V6h12v13z"
        fill={color}
      />
      <path
        d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM14 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z"
        fill={color}
      />
    </svg>
  );
}

DeleteIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

DeleteIcon.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default DeleteIcon;
