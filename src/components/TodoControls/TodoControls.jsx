import React from 'react';
import PropTypes from 'prop-types';
import { Container, Checkbox, Select } from '../UI';
import { todoFilterItems } from '../../utils/filterConst';
import styles from './TodoControls.module.css';

function TodoControls({
  isAddFormVisible, onCheckboxChange, filterValue, onFilterChange,
}) {
  return (
    <Container className={styles.controls}>
      <Checkbox
        name="app-checkbox"
        label="Create items"
        aria-label="Create items"
        value={isAddFormVisible}
        onChange={onCheckboxChange}
        autoFocus
      />
      <Select
        name="app-select"
        items={todoFilterItems}
        value={filterValue}
        onSelectChange={onFilterChange}
      />
    </Container>
  );
}

TodoControls.propTypes = {
  isAddFormVisible: PropTypes.bool.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  filterValue: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default React.memo(TodoControls);
