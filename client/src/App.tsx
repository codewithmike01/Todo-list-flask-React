import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { handleSubmit } from './services/App.services';
import axios from 'axios';

interface ITodoList {
  id: string;
  todo: string;
  is_complete: boolean;
}

const baseUrl = 'http://127.0.0.1:5000/';

function App() {
  const [todoItem, setTodoItem] = useState<string>('');
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // const [data, error, loading] = useGetTodo();

  // Fetch data on render
  const fecthTodo = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}todos`)
      .then((res) => {
        console.log(res, 'THis is RES');
        setTodoList(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // Post
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    todo: string
  ) => {
    event.preventDefault();
    setLoading(true);
    const data = {
      todo,
      is_complete: false,
    };

    await axios
      .post(`${baseUrl}todos`, data)
      .then((res) => {
        setTodoList(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fecthTodo();
  }, []);

  return (
    <>
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

        <div className={styles.todoListSection}>
          {loading ? (
            <p>Loading ....</p>
          ) : (
            todoList.map((todoItem) => <div>{todoItem?.todo}</div>)
          )}
        </div>
      </section>
    </>
  );
}

export default App;
