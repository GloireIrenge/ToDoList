const clearAllCompleted = (todos) => todos.filter((task) => !task.completed);
const IsChecked = (todos, s, i) => {
    if (s.checked) {
        todos[i].completed = true;
    } else {
        todos[i].completed = false;
    }
    localStorage.setItem('todos', JSON.stringify(todos));
  };
export { IsChecked, clearAllCompleted };