import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
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
  const [editTodo, setEditTodo] = useState(false);
  const [editTodoItem, setEditTodoItem] = useState<ITodoList>({
    id: '',
    todo: '',
    is_complete: false,
  });

  // Fetch data on render
  const fecthTodo = async () => {
    setLoading(true);
    await axios
      .get(`${baseUrl}todos`)
      .then((res) => {
        setTodoList(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // Delete Todo Item
  const deleteTodoItem = async (todoId: string) => {
    await axios
      .delete(`${baseUrl}todos/${todoId}`)
      .then((res) => {
        setTodoList(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // Post Todo
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
        setTodoItem('');
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  //  Delete Todo
  const updateTodo = async (todoId: string, objData?: ITodoList) => {
    let data = {};

    // To byPass slow state change
    if (objData) {
      data = {
        ...objData,
      };
    } else {
      data = {
        ...editTodoItem,
      };
    }

    setLoading(true);
    await axios
      .put(`${baseUrl}todos/${todoId}`, data)
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
      <section className={styles.todoContainer}>
        <h1 className={styles.heading}>Todo List</h1>

        <form
          onSubmit={(e) => handleSubmit(e, todoItem)}
          className={styles.formContainer}
        >
          <input
            type="text"
            value={todoItem}
            onChange={(e) => setTodoItem(e.target.value)}
            className={styles.formInputField}
          />
          <button type="submit" className={styles.formBtn}>
            Add Todo
          </button>
        </form>

        <div className={styles.todoListSection}>
          {loading ? (
            <p>Loading ....</p>
          ) : (
            todoList
              .map((todoItemVal) => (
                <div
                  key={todoItemVal?.id}
                  className={styles.todoListSectionItem}
                >
                  {editTodo && todoItemVal?.id === editTodoItem?.id ? (
                    <input
                      type="text"
                      value={editTodoItem?.todo}
                      onChange={(e) =>
                        setEditTodoItem({
                          ...editTodoItem,
                          todo: e.target.value,
                        })
                      }
                      contentEditable={editTodo}
                      className={styles.todoListSectionInput}
                    />
                  ) : (
                    <p
                      className={todoItemVal?.is_complete ? styles.strike : ''}
                    >
                      {todoItemVal?.todo}
                    </p>
                  )}
                  <div className={styles.todoListSectionBtnContainer}>
                    <button
                      onClick={() => deleteTodoItem(todoItemVal?.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        if (editTodo) {
                          updateTodo(todoItemVal?.id);
                          setEditTodo(false);
                        } else {
                          setEditTodo(true);
                          setEditTodoItem({
                            id: todoItemVal?.id,
                            todo: todoItemVal?.todo,
                            is_complete: todoItemVal?.is_complete,
                          });
                        }
                      }}
                      className={styles.saveBtn}
                    >
                      {editTodo && todoItemVal?.id === editTodoItem?.id
                        ? 'Save'
                        : ' Edit'}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        let objData: ITodoList = {
                          ...todoItemVal,
                          is_complete: !todoItemVal?.is_complete,
                        };
                        updateTodo(todoItemVal?.id, objData);
                      }}
                      className={styles.completeBtn}
                    >
                      {todoItemVal?.is_complete
                        ? 'Mark incomplete'
                        : 'Mark complete'}
                    </button>
                  </div>
                </div>
              ))
              .reverse()
          )}
        </div>
      </section>
    </>
  );
}

export default App;
