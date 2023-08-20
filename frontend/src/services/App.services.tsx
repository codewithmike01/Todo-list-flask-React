import { toast } from 'react-toastify';

export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  todoItem: string
) => {
  event.preventDefault();

  if (todoItem !== '') {
    // Perform Operaton
  } else toast.warning('Please enter a todo');
};
