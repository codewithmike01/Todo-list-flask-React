import axios from 'axios';
import { useEffect, useState } from 'react';

interface IGetToddu {
  url: string;
}

const useGetTodo = () => {
  const [data, setData] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  /*  const fecthTodo = async () => {
    setLoading(true);
    await axios
      .get()
      .then((res) => {
        setData(res.data);
        setLoading(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(true);
      });
  };


  useEffect(() => {
    fecthTodo();
  }, []);

*/

  return [data, error, loading];
};
export default useGetTodo;
