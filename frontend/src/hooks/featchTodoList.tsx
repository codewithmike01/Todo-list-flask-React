import { useEffect, useState } from 'react';

interface ITodoList {
  id: string;
  todo: string;
  is_complete: boolean;
}

export const useFecthTodoList = () => {
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<ITodoList[]>([
    { id: '', todo: '', is_complete: false },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchTodo = async () => {};

  useEffect(() => {
    fetchTodo();
  }, []);
  return [data, error, loading] as const;
};
