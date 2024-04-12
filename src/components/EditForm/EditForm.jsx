import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container, Form, FormattedMessage, Input, Button,
} from '../UI';
import { EDIT_ERROR } from '../../utils/const';
import styles from './EditForm.module.css';

function EditForm({
  name,
  item,
  onSaveChanges,
  onCancel,
  isSaving,
}) {
  const [editedValue, setEditedValue] = useState('');
  const [hasError, setHasError] = useState(false);
  const inputRef = useRef(null);
  const itemTitle = item ? item.title : '';

  const inputName = `${name}-input`;
  const prevValueName = `${name}-prev-value`;
  const saveButtonName = `${name}-save-button`;
  const cancelButtonName = `${name}-cancel-button`;
  const inputsClass = `${styles.form__group} ${styles.form__inputs}`;
  const buttonsClass = `${styles.form__group} ${styles.form__buttons}`;

  useEffect(() => {
    const value = item ? item.title : '';
    setEditedValue(value);
    if (value.length > 0) {
      inputRef.current.focus();
    }

    return (() => {
      setHasError(false);
    });
  }, [item]);

  const handleChange = (event) => {
    const value = event.target.value.trim();
    setEditedValue(value);
    setHasError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editedValue.length > 0) {
      onSaveChanges(item.id, editedValue);
    } else {
      setHasError(true);
      inputRef.current.focus();
    }
  };

  const saveButton = (
    <Button
      type="submit"
      name={saveButtonName}
      aria-describedby="Save changes"
      className={styles.form__button}
      disabled={isSaving}
    >
      { isSaving ? 'Saving...' : 'Save'}
    </Button>
  );

  const cancelButton = (
    <Button
      name={cancelButtonName}
      aria-describedby="Close form without saving"
      onClick={onCancel}
      className={styles.form__button}
      disabled={isSaving}
    >
      Cancel
    </Button>
  );

  return (
    <Container className={styles['form-wrapper']}>
      <Form
        name={name}
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <fieldset className={inputsClass}>
          <FormattedMessage hasError={hasError} className={styles.form__message}>
            {EDIT_ERROR}
          </FormattedMessage>

          <Input
            name={prevValueName}
            aria-label="Old value of edited task"
            disabled
            value={itemTitle}
            className={styles.form__input}
          />

          <Input
            name={inputName}
            ref={inputRef}
            aria-label="Edited task"
            autoFocus
            disabled={isSaving}
            value={editedValue}
            hasError={hasError}
            onChange={handleChange}
            placeholder="Edited task"
            className={styles.form__input}
          />
        </fieldset>

        <fieldset className={buttonsClass}>
          {saveButton}
          {cancelButton}
        </fieldset>
      </Form>
    </Container>
  );
}

EditForm.propTypes = {
  name: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
  }),
  onSaveChanges: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
};

EditForm.defaultProps = {
  item: null,
};

export default React.memo(EditForm);
