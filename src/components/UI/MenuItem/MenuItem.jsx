import React from 'react';
import PropTypes from 'prop-types';
import styles from './MenuItem.module.css';

function MenuItem({
  itemData,
  onClick,
  onKeyDown,
  onMouseEnter,
  children,
}) {
  const {
    id, tabIndex, checkmark, isSelected,
  } = itemData;

  const handleClick = (event) => {
    const newValue = Number(event.currentTarget.id);
    onClick(newValue);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.code;
    const newValue = Number(event.target.id);

    event.preventDefault();
    onKeyDown(keyCode, newValue);
  };

  const handleMouseEnter = (event) => {
    const newValue = Number(event.currentTarget.id);
    onMouseEnter(newValue);
  };

  return (
    <li
      id={id}
      tabIndex={tabIndex}
      className={styles.item}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      role="option"
      aria-selected={isSelected}
    >
      <p className={styles.item__label}>
        {children}
      </p>
      <span className={styles.item__checkmark} aria-hidden>
        {checkmark}
      </span>
    </li>

  );
}

MenuItem.propTypes = {
  itemData: PropTypes.shape({
    id: PropTypes.string,
    tabIndex: PropTypes.string,
    checkmark: PropTypes.element,
    isSelected: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  onMouseEnter: PropTypes.func,
  children: PropTypes.node.isRequired,
};

MenuItem.defaultProps = {
  onClick: () => {},
  onKeyDown: () => {},
  onMouseEnter: () => {},
};

export default MenuItem;
