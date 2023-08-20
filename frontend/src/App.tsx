import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './App.module.css';
import { handleSubmit } from './services/App.services';
import { useFecthTodoList } from './hooks/featchTodoList';

interface ITodoList {
  id: string;
  todo: string;
  is_complete: boolean;
}

function App() {
  const [todoItem, setTodoItem] = useState<string>('');
  const [data, error, loading] = useFecthTodoList();
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
