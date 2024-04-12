import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, IconButton, Loader } from '../UI';
import { EditIcon, DeleteIcon } from '../icons';
import { classNames } from '../../utils';
import styles from './TodoItem.module.css';

function TodoItem({
  item,
  isSaving,
  onDeleteItem,
  onEditItem,
  onCheckItem,
  className,
}) {
  const [action, setAction] = useState(null);
  const [changedItem, setChangedItem] = useState(null);

  useEffect(() => {
    if (!isSaving) {
      setAction(null);
      setChangedItem(null);
    }
  }, [isSaving]);

  const handleDelete = () => {
    setAction('delete');
    setChangedItem(item.id);
    onDeleteItem(item.id);
  };

  const handleEdit = () => {
    onEditItem(item);
  };

  const handleCheck = () => {
    setAction('check');
    setChangedItem(item.id);
    onCheckItem(item.id, !item.completed);
  };

  const isChecking = isSaving && item.id === changedItem && action === 'check';
  const isDeleting = isSaving && item.id === changedItem && action === 'delete';

  const editButton = (
    <IconButton
      onClick={handleEdit}
      aria-label="Edit"
      disabled={isChecking || isDeleting}
    >
      <EditIcon
        aria-hidden="true"
        focusable="false"
        className={styles.item__icon}
      />
    </IconButton>
  );

  const deleteButton = (
    <IconButton
      onClick={handleDelete}
      aria-label="Delete"
      disabled={isChecking || isDeleting}
    >
      <DeleteIcon
        aria-hidden="true"
        focusable="false"
        className={styles.item__icon}
      />
    </IconButton>
  );

  const renderCheckBox = () => {
    if (isChecking || isDeleting) return <Loader type="small" />;
    return (
      <Checkbox
        name={`checkbox-${item.id}`}
        aria-label="True if the item is completed"
        value={item.completed}
        onChange={handleCheck}
      />
    );
  };

  const renderTitle = () => {
    if (isChecking) return 'Saving...';
    if (isDeleting) return 'Deleting...';
    return item.title;
  };

  const completedStyle = item.completed && !(isSaving || isDeleting) ? styles.item__title_completed : '';

  return (
    <li className={classNames(styles.item, className)}>
      <div className={styles['item__data-group']}>
        { renderCheckBox() }
        <p className={classNames(styles.item__title, completedStyle)}>
          { renderTitle() }
        </p>
      </div>

      <div className={styles['item__button-group']}>
        {editButton}
        {deleteButton}
      </div>
    </li>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }).isRequired,
  isSaving: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onCheckItem: PropTypes.func.isRequired,
  className: PropTypes.string,
};

TodoItem.defaultProps = {
  className: '',
};

export default TodoItem;
