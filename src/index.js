import './style.css';
import { Todo, TodoLoad } from './Add_remove.js';

let todos = [];

const MyTodoList = document.querySelector('.tasks-list');

const showTodo = (todos) => {
  MyTodoList.innerHTML = '';
  for (let i = 0; i < todos.length; i += 1) {
    MyTodoList.innerHTML += `<li class="task" id=${i} data-id="${todos[i].index}">
    <div class="task-desc">
      <input type="checkbox" name="task" class="toggle-check" />
      <input class="task-edit" value="${todos[i].description}" disabled autofocus/>
    </div>
    <i class="fa-solid fa-ellipsis-vertical "></i>
    <i class="fa-solid fa-trash-can hidden"></i>
  </li>`;
  }
};

MyTodoList.addEventListener('click', (e) => {
  const task = new Todo();
  if (e.target.nodeName === 'INPUT') {
    e.target.parentElement.parentElement.style.backgroundColor = '#ffffa7';
    e.target.parentElement.parentElement.children[1].style.display = 'none';
    e.target.parentElement.parentElement.children[2].style.display = 'inline';
    setTimeout(() => {
      e.target.parentElement.parentElement.style.backgroundColor = '#fff';
      e.target.parentElement.parentElement.children[1].style.display = 'inline';
      e.target.parentElement.parentElement.children[2].style.display = 'none';
    }, 2000);
  }
  if (e.target.classList.contains('hidden')) {
    task.deleteTodo(e, todos);
  }
});

const initAll = (input) => {
  input.value = '';
};

const TodoCreate = (input) => {
  const desc = input.value;
  const task = new Todo(desc);
  task.addTodo(task, todos);
};

const description = document.querySelector('#new-task');

document.querySelector('#addBtn').addEventListener('click', () => {
  TodoCreate(description);
  initAll(description);
  showTodo(todos);
});

document.querySelector('.input').addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && (e.target.value)) {
    TodoCreate(description);
    initAll(description);
    showTodo(todos);
  }
});

const TodoEdit = (e) => {
  const editing = e.parentElement.parentElement;
  const i = editing.id;
  editing.children[0].children[1].addEventListener('input', () => {
    const newValue = editing.children[0].children[1].value;
    editing.children[0].children[1].value = newValue;
    todos[i].description = newValue;
    localStorage.setItem('todos', JSON.stringify(todos));
  });
};

MyTodoList.addEventListener('click', (e) => {
  if (e.target.disabled === true) {
    e.target.disabled = false;
    e.target.setAttribute('autofocus', true);
    TodoEdit(e.target);
  }
});

todos = TodoLoad();
showTodo(todos);