import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import { handleSubmit } from './services/App.services';

interface ITodoList {
  id: string;
  todo: string;
  is_complete: boolean;
}

function App() {
  const [todoItem, setTodoItem] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodoList[]>([]);

  return (
    <>
      <ToastContainer />

      <section>
        <h1 className={styles.heading}>Todo List</h1>

        <form onSubmit={(e) => handleSubmit(e, todoItem)}>
          <input
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
          />
          <button type="submit">Add Todo</button>
        </form>

        <div className={styles.todoListSection}></div>
      </section>
    </>
  );
}

export default App;
