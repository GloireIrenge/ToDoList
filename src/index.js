import './style.css';

const toDo = [
  {
    index: 0,
    description: 'Learn Javascript classes',
    completed: false,
  },
  {
    index: 1,
    description: 'make a small project',
    completed: false,
  },
  {
    index: 2,
    description: 'Attend Microverse meeting',
    completed: false,
  },

];

const AllToDo = document.querySelector('.TodoList');
const showTodo = (toDo) => {
  for (let i = 0; i < toDo.length; i += 1) {
    AllToDo.innerHTML += `<li class="todo" id=${toDo[i].index}>
    <div class="TodoDesc">
      <input type="checkbox" name="todo" class="toggle-check" />
      <span class="description">${toDo[i].description}</span>
    </div>
  </li>`;
  }
};

window.addEventListener('DOMContentLoaded', showTodo(toDo));
