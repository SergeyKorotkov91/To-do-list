import React from 'react';
import PropTypes from 'prop-types';

function CheckIcon({ color, className }) {
  return (
    <svg
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#prefix__clip0_1043_6737)">
        <path
          d="M22.32 4.431L8.5 18.249a1 1 0 01-1.417 0L1.74 12.9a1 1 0 00-1.635.325 1 1 0 00.218 1.092l5.346 5.345a3.008 3.008 0 004.25 0L23.736 5.847a1 1 0 00-.708-1.71 1 1 0 00-.709.294z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="prefix__clip0_1043_6737">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}

CheckIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

CheckIcon.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default CheckIcon;
