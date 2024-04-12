import React from 'react';
import ReactDOM from 'react-dom/client';
import TodoApp from './components/TodoApp/TodoApp';
import { TodosProvider } from './store/TodosContext';
import './styles/globals.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodosProvider>
      <TodoApp />
    </TodosProvider>
  </React.StrictMode>,
);
