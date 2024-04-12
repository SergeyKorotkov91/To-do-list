import React from 'react';
import PropTypes from 'prop-types';

function EditIcon({
  color,
  className,
  ...props
}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

EditIcon.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
};

EditIcon.defaultProps = {
  color: '#3B3748',
  className: '',
};

export default EditIcon;
