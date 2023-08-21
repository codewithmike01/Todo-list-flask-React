export const handleSubmit = (
  event: React.FormEvent<HTMLFormElement>,
  todoItem: string
) => {
  event.preventDefault();

  if (todoItem !== '') {
    // Perform Operaton
  } else console.log('Please enter a todo');
};
