import React, {
  useState, useRef, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/Input';
import Menu from '../Menu/Menu';
import { CaretDownIcon } from '../../icons';
import { classNames, getActiveIndex } from '../../../utils';
import styles from './Select.module.css';

function Select({
  name, items, value, onSelectChange, className,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState(1);
  const inputRef = useRef(null);
  const selectRef = useRef(null);

  const inputName = `${name}-select-input`;
  const activeIndex = getActiveIndex(items, value);
  const inputValue = items[activeIndex].label;

  const hideMenu = useCallback(() => {
    setIsExpanded(false);
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isExpanded && selectRef.current && !selectRef.current.contains(event.target)) {
        hideMenu();
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isExpanded, selectRef, hideMenu]);

  const handleCloseMenu = (keyCode) => {
    if (keyCode === 'Escape' || keyCode === 'Tab') {
      hideMenu();
    }
  };

  const handleSelectItem = (newValue) => {
    setSelected(newValue);
    hideMenu();
    onSelectChange(newValue);
  };

  const handleClick = () => {
    setIsExpanded((prevValue) => !prevValue);
  };

  const handleKeyDown = (event) => {
    const keyCode = event.code;
    if (keyCode === 'Tab') return;
    event.preventDefault();
    if (keyCode === 'Enter' || keyCode === 'Space') {
      setIsExpanded(true);
    }
  };

  const iconClass = isExpanded ? styles.select__icon_expanded : '';
  const iconElement = (
    <CaretDownIcon
      className={classNames(styles.select__icon, iconClass)}
    />
  );

  const menuElement = (
    <Menu
      items={items}
      activeValue={selected}
      onSelectItem={handleSelectItem}
      onCloseMenu={handleCloseMenu}
      className={styles.select__menu}
    />
  );

  const inputElement = (
    <Input
      id={inputName}
      name={inputName}
      value={inputValue}
      ref={inputRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={styles.select__input}
      readOnly
    />
  );

  // ------------------------------------------------------------------------------------
  return (
    <div ref={selectRef} className={classNames(styles.select, className)}>
      <label htmlFor={inputName} className={styles.select__label}>
        {inputElement}
        {iconElement}
      </label>

      {isExpanded && menuElement}
    </div>
  );
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.number.isRequired,
  onSelectChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Select.defaultProps = {
  className: '',
};

export default React.memo(Select);
