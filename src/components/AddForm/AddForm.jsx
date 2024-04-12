import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Form, Input, Button, FormattedMessage,
} from '../UI';
import { ADD_ERROR } from '../../utils/const';
import styles from './AddForm.module.css';

function AddForm({ name, onAddItem, isSaving }) {
  const [newItem, setNewItem] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);

  const inputName = `${name}-input`;
  const buttonName = `${name}-button`;

  useEffect(() => {
    if (!isSaving) inputRef.current.focus();
  }, [isSaving]);

  const handleItemChange = (event) => {
    const value = event.target.value.trim();
    setNewItem(value);
    setHasError(false);
  };

  const resetInput = () => {
    setNewItem('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newItem.length > 0) {
      onAddItem(newItem, resetInput);
    } else {
      setHasError(true);
    }
    inputRef.current.focus();
  };

  const errorMessageElement = (
    <FormattedMessage hasError={hasError} className={styles.form__message}>
      {ADD_ERROR}
    </FormattedMessage>
  );

  return (
    <Container className={styles['form-wrapper']}>
      <Form
        name={name}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {errorMessageElement}

        <Input
          name={inputName}
          aria-label="New task"
          disabled={isSaving}
          autoFocus
          placeholder="New task"
          ref={inputRef}
          value={newItem}
          hasError={hasError}
          onChange={handleItemChange}
          className={styles.form__input}
        />

        <Button
          type="submit"
          name={buttonName}
          aria-label="Add new task"
          disabled={isSaving}
          className={styles.form__button}
        >
          { isSaving ? 'Saving...' : 'Add' }
        </Button>
      </Form>
    </Container>
  );
}

AddForm.propTypes = {
  name: PropTypes.string.isRequired,
  onAddItem: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

export default AddForm;
