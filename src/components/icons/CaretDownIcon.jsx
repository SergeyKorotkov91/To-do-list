import React from 'react';
import PropTypes from 'prop-types';

function CaretDownIcon({ color, className }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.414 9h11.172a1 1 0 01.707 1.707l-5.586 5.586a1 1 0 01-1.414 0l-5.586-5.586A1 1 0 016.414 9z"
        fill={color}
      />
    </svg>
  );
}

CaretDownIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

CaretDownIcon.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default CaretDownIcon;
