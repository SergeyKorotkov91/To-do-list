import React, { useState, useCallback, useEffect } from 'react';
import {
  TodoHeader, AddForm, TodoControls, TodoList, EditFormPopup, Footer,
} from '..';
import { Container, Notification } from '../UI';
import { useEditForm, useApi } from '../../hooks';
import { TODO_FILTER_NONE } from '../../utils/filterConst';
import styles from './TodoApp.module.css';

function TodoApp() {
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [filterState, setFilterState] = useState(TODO_FILTER_NONE);
  const {
    isLoading, isSaving, errorMessage, setErrorMessage, ...api
  } = useApi();
  const {
    isEditFormVisible, editedItem, handleStartEditing, handleCancelEditing,
  } = useEditForm();

  useEffect(() => {
    api.getInitialTodos();
  }, [api.getInitialTodos]);

  const handleEditItem = useCallback((item) => {
    handleStartEditing(item);
  }, [handleStartEditing]);

  const handleFilterChange = useCallback((value) => {
    setFilterState(value);
  }, []);

  const handleCheckboxChange = useCallback(() => {
    setIsAddFormVisible((prevState) => !prevState);
  }, []);

  const handleSaveItem = useCallback((taskId, taskText) => {
    api.saveTodo(taskId, taskText, handleCancelEditing);
  }, [api.saveTodo]);

  const handleNotificationClose = useCallback(() => {
    setErrorMessage('');
  }, []);

  const areControlsVisible = !isLoading || (isLoading && isAddFormVisible);

  return (
    <>
      <Container className={styles.app}>
        <TodoHeader>Todo List</TodoHeader>

        { isAddFormVisible && (
          <AddForm
            name="form-add"
            onAddItem={api.createTodo}
            isSaving={isSaving}
          />
        )}

        { areControlsVisible && (
          <TodoControls
            isAddFormVisible={isAddFormVisible}
            onCheckboxChange={handleCheckboxChange}
            filterValue={filterState}
            onFilterChange={handleFilterChange}
          />
        )}

        <TodoList
          filterState={filterState}
          isLoading={isLoading}
          isSaving={isSaving}
          onDeleteItem={api.deleteTodo}
          onEditItem={handleEditItem}
          onCheckItem={api.checkTodo}
        />

        <Footer />
      </Container>

      { errorMessage && (
        <Notification onClose={handleNotificationClose}>
          {errorMessage}
        </Notification>
      )}

      <EditFormPopup
        isVisible={isEditFormVisible}
        isSaving={isSaving}
        name="form-edit"
        item={editedItem}
        onSaveChanges={handleSaveItem}
        onCancel={handleCancelEditing}
      />
    </>
  );
}

export default React.memo(TodoApp);
