import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import { Container, Loader } from '../UI';
import { useTodos } from '../../store/TodosContext';
import { classNames, filterTodos, getActiveIndex } from '../../utils';
import { TODO_FILTER_NONE, todoFilterItems } from '../../utils/filterConst';
import styles from './TodoList.module.css';

function LoadingList() {
  return (
    <Container className={classNames(styles.list, styles.list_loading)}>
      <p className={styles.list__text}>Loading...</p>
      <Loader />
    </Container>
  );
}

function EmptyList({ children }) {
  return (
    <Container className={classNames(styles.list, styles.list_empty)}>
      <p className={styles.list__nocontent}>
        {children}
      </p>
    </Container>
  );
}

function TodoList({
  filterState,
  isLoading,
  isSaving,
  onDeleteItem,
  onEditItem,
  onCheckItem,
}) {
  const todos = useTodos();

  if (isLoading) return <LoadingList />;

  const filteredTodos = filterTodos(todos, filterState);
  if (filteredTodos.length === 0) {
    let str = '';
    if (filterState !== TODO_FILTER_NONE) {
      const index = getActiveIndex(todoFilterItems, filterState);
      str = `${todoFilterItems[index].label.toLowerCase()} `;
    }
    return (
      <EmptyList>
        {`There's no ${str}items on your list.`}
      </EmptyList>
    );
  }

  return (
    <Container className={styles.list}>
      <ul className={styles.list__content}>
        {filteredTodos.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            isSaving={isSaving}
            onDeleteItem={onDeleteItem}
            onEditItem={onEditItem}
            onCheckItem={onCheckItem}
          />
        ))}
      </ul>
    </Container>
  );
}

EmptyList.propTypes = {
  children: PropTypes.node.isRequired,
};

TodoList.propTypes = {
  filterState: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onCheckItem: PropTypes.func.isRequired,
};

export default React.memo(TodoList);
