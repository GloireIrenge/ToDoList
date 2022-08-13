import './style.css';
import { Todo, TodoLoad } from './Add_remove.js';
import { IsChecked, clearAllCompleted } from './completed.js';

let todos = [];

const MyTodoList = document.getElementById('TodoList');

MyTodoList.addEventListener('click', (e) => {
  const task = new Todo();
  if (e.target.nodeName === 'INPUT') {
    e.target.parentElement.parentElement.style.backgroundColor = '#f6e4672e';
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
const showTodo = (todos) => {
  MyTodoList.innerHTML = '';
  for (let i = 0; i < todos.length; i += 1) {
    if (todos[i].isComplete) {
      MyTodoList.innerHTML += `<li class="todo_item" data-id="${todos[i].index}" id=${i} >
    <div class="description">
      <input type="checkbox" name="todo" class="toggle-check" checked />
      <input value="${todos[i].description}" disabled/>
    </div>
    <i class="fa-solid fa-ellipsis-vertical "></i>
    <i class="fa-solid fa-trash-can hidden"></i>
  </li>`;
    } else {
      MyTodoList.innerHTML += `<li class="todo_item" data-id="${todos[i].index}" id=${i} >
        <div class="description">
          <input type="checkbox" name="todo" class="toggle-check" />
          <input value="${todos[i].description}" disabled/>
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
        <i class="fa-solid fa-trash-can hidden"></i>
      </li>`;
    }
  }
};

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

MyTodoList.addEventListener('click', (e) => {
  if (e.target.nodeName === 'INPUT' && e.target.type === 'checkbox') {
    if (e.target.checked) {
      e.target.parentElement.children[1].style.textDecoration = 'line-through';
    } else {
      e.target.parentElement.children[1].style.textDecoration = 'none';
    }
    const i = e.target.parentElement.parentElement.id;
    IsChecked(todos, e.target, i);
  }
});

todos = TodoLoad();
showTodo(todos);

const DeleteSelected = document.getElementById('clearButton');
DeleteSelected.addEventListener('click', () => {
  todos = clearAllCompleted(todos);
  localStorage.setItem('todos', JSON.stringify(todos));
  showTodo(todos);
});

document.getElementById('reload').addEventListener('click', () => {
  document.getElementById('reload').style.transform = 'rotate(750deg)';
  document.location.reload();
});