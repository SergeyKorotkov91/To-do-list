import React from 'react';
import PropTypes from 'prop-types';

function CloseIcon({ color, className, ...props }) {
  return (
    <svg
      width="33"
      height="33"
      viewBox="0 0 33 33"
      fill="none"
      className={className}
      {...props}
    >
      <path
        d="M32.7905 29.5903L19.9905 16.7903L32.7905 3.99028L29.5905 0.790283L16.7905 13.5903L3.99053 0.790283L0.790527 3.99028L13.5905 16.7903L0.790527 29.5903L3.99053 32.7903L16.7905 19.9903L29.5905 32.7903L32.7905 29.5903Z"
        fill={color}
      />
    </svg>
  );
}

CloseIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

CloseIcon.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default CloseIcon;
