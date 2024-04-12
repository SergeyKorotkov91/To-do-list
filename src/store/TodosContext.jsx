import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { transformToArray } from '../utils';

const TodosContext = createContext([]);
const TodosDispatchContext = createContext(null);

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INIT': {
      const array = transformToArray(action.data);
      return array.map((item) => ({ ...item, id: String(item.id) }));
    }
    case 'ADD': {
      return [...todos, action.newTodo];
    }
    case 'DELETE': {
      return todos.filter((x) => x.id !== action.taskId);
    }
    case 'CHANGE': {
      const array = [...todos];
      const index = array.findIndex((x) => x.id === action.taskId);
      array[index].title = action.taskText;
      return array;
    }
    case 'CHECK': {
      return todos.map((item) => {
        if (item.id === action.taskId) {
          return { ...item, completed: action.newValue };
        }
        return item;
      });
    }
    default:
      throw Error(`Unknown action: ${action.type}`);
  }
}

export function TodosProvider({ children }) {
  const [todos, dispatch] = useReducer(todoReducer, []);

  return (
    <TodosContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosContext.Provider>
  );
}

TodosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useTodos() {
  return useContext(TodosContext);
}

export function useTodosDispatch() {
  return useContext(TodosDispatchContext);
}
