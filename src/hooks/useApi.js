import { useState, useCallback } from 'react';
import { useTodosDispatch } from '../store/TodosContext';
import {
  DATA_URL, DATA_HEADERS, ERRMSG_READ, ERRMSG_SAVE, ERRMSG_CREATE, ERRMSG_DELETE,
} from '../utils/const';
import {
  getData, patchData, postData, deleteData,
} from '../utils/api';
import { createNewItem } from '../utils';

function useApi() {
  const dispatch = useTodosDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getInitialTodos = useCallback(() => {
    setIsLoading(true);
    dispatch({ type: 'INIT', data: [] });
    getData(DATA_URL, DATA_HEADERS)
      .then((data) => {
        dispatch({ type: 'INIT', data });
      })
      .catch((error) => {
        setErrorMessage(`${ERRMSG_READ}. ${error}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const saveTodo = useCallback((taskId, taskText, callback) => {
    if (taskId.startsWith('0')) {
      dispatch({ type: 'CHANGE', taskId, taskText });
      callback();
      return;
    }

    setIsSaving(true);
    patchData(DATA_URL, DATA_HEADERS, taskId, { title: taskText })
      .then(() => {
        dispatch({ type: 'CHANGE', taskId, taskText });
        if (callback) callback();
      })
      .catch((error) => {
        setErrorMessage(`${ERRMSG_SAVE}. ${error}`);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [patchData]);

  const createTodo = useCallback((taskText, callback) => {
    setIsSaving(true);
    const newItem = createNewItem(taskText);

    postData(DATA_URL, DATA_HEADERS, newItem)
      .then((result) => {
        dispatch({ type: 'ADD', newTodo: { ...result } });
        if (callback) callback();
      })
      .catch((error) => {
        setErrorMessage(`${ERRMSG_CREATE}. ${error}`);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [postData]);

  const deleteTodo = useCallback((taskId) => {
    if (taskId.startsWith('0')) {
      dispatch({ type: 'DELETE', taskId });
      return;
    }

    setIsSaving(true);
    deleteData(DATA_URL, DATA_HEADERS, taskId)
      .then(() => {
        dispatch({ type: 'DELETE', taskId });
      })
      .catch((error) => {
        setErrorMessage(`${ERRMSG_DELETE}. ${error}`);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [deleteData]);

  const checkTodo = useCallback((taskId, newValue) => {
    if (taskId.startsWith('0')) {
      dispatch({ type: 'CHECK', taskId, newValue });
      return;
    }

    setIsSaving(true);
    patchData(DATA_URL, DATA_HEADERS, taskId, { completed: newValue })
      .then(() => {
        dispatch({ type: 'CHECK', taskId, newValue });
      })
      .catch((error) => {
        setErrorMessage(`${ERRMSG_SAVE}. ${error}`);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }, [patchData]);

  return {
    isLoading,
    isSaving,
    errorMessage,
    setErrorMessage,
    getInitialTodos,
    createTodo,
    saveTodo,
    deleteTodo,
    checkTodo,
  };
}

export default useApi;
