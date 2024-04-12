import { nanoid } from 'nanoid';
import * as filters from './filterConst';
import { USER_ID } from './const';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const filterTodos = (array, filterState) => {
  if (filterState === filters.TODO_FILTER_NONE) {
    return array;
  }
  const filterValue = (filterState === filters.TODO_FILTER_COMPLETED);
  return array.filter((x) => x.completed === filterValue);
};

function getActiveIndex(array, value, field = 'value') {
  const index = array.findIndex((x) => x[field] === value);
  return index >= 0 ? index : 0;
}

function transformToArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return [...data];
  const result = Object.entries(data);
  return result.map(([key, item]) => ({ ...item, id: key }));
}

function createNewItem(taskText) {
  const nanoId = nanoid();
  const taskId = `0${nanoId.slice(1)}`;
  return {
    id: taskId,
    userId: USER_ID,
    title: taskText,
    completed: false,
  };
}

export {
  classNames,
  getActiveIndex,
  transformToArray,
  createNewItem,
  filterTodos,
};
