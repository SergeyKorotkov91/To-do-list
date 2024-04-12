import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { classNames, getActiveIndex } from '../../../utils';
import MenuItem from '../MenuItem/MenuItem';
import { CheckIcon } from '../../icons';
import styles from './Menu.module.css';

function getCheckmark(value, activeVal) {
  if (value === activeVal) {
    return <CheckIcon className={styles.menu__icon} />;
  }
  return null;
}

function Menu({
  items,
  activeValue,
  onSelectItem,
  onCloseMenu,
  className,
}) {
  const listRef = useRef(null);
  const indexRef = useRef(getActiveIndex(items, activeValue));

  useEffect(() => {
    indexRef.current = getActiveIndex(items, activeValue);
    listRef.current.children[indexRef.current].focus();
  }, [activeValue, items]);

  const handleClick = (newValue) => {
    indexRef.current = getActiveIndex(items, newValue);
    if (onSelectItem) {
      onSelectItem(newValue);
    }
  };

  const handleKeyDown = (keyCode, newValue) => {
    const i = indexRef.current;

    if (keyCode === 'ArrowDown' && i < items.length - 1) {
      indexRef.current = i + 1;
      listRef.current.children[indexRef.current].focus();
      return;
    }

    if (keyCode === 'ArrowUp' && i > 0) {
      indexRef.current = i - 1;
      listRef.current.children[indexRef.current].focus();
      return;
    }

    if (keyCode === 'Enter') {
      if (onSelectItem) onSelectItem(newValue);
    }

    onCloseMenu(keyCode);
  };

  const handleMouseEnter = (newValue) => {
    indexRef.current = getActiveIndex(items, newValue);
    listRef.current.children[indexRef.current].focus();
  };

  const menuItems = items.map((item, index) => {
    const itemInfo = {
      id: item.value.toString(),
      tabIndex: (index + 1).toString(),
      isSelected: index === indexRef.current,
      checkmark: getCheckmark(item.value, activeValue),
    };

    return (
      <MenuItem
        key={itemInfo.id}
        itemData={itemInfo}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
      >
        {item.label}
      </MenuItem>
    );
  });

  // ------------------------------------------------------------------------------------
  return (
    <ul
      className={classNames(styles.menu, className)}
      ref={listRef}
      role="listbox"
    >
      {menuItems}
    </ul>
  );
}

Menu.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ),
  activeValue: PropTypes.number,
  onSelectItem: PropTypes.func,
  onCloseMenu: PropTypes.func,
  className: PropTypes.string,
};

Menu.defaultProps = {
  items: [
    { value: 1, label: 'Item 1' },
    { value: 2, label: 'Item 2' },
    { value: 3, label: 'Item 3' },
  ],
  activeValue: 1,
  onSelectItem: () => {},
  onCloseMenu: () => {},
  className: '',
};

export default Menu;
