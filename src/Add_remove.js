const TodoLoad = (todos) => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  for (let i = 0; i < todos.length; i += 1) {
    todos[i].index = i + 1;
  }
  return todos;
};

class Todo {
  constructor(description, index = 0, completed = false) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }

  addTodo = (task, todos) => {
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteTodo = (e, todos) => {
    e.target.parentElement.remove();
    todos.splice(e.target.parentElement.id, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

export { TodoLoad, Todo };