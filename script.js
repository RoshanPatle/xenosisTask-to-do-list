document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    const saveTodos = () => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const renderTodos = () => {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
                <span>${todo.text}</span>
                <div>
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="complete" data-index="${index}">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            `;
            todoList.appendChild(li);
        });
    };

    const addTodo = (text) => {
        todos.push({ text, completed: false });
        saveTodos();
        renderTodos();
    };

    const editTodo = (index, newText) => {
        todos[index].text = newText;
        saveTodos();
        renderTodos();
    };

    const deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    const toggleCompleteTodo = (index) => {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    };

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo) {
            addTodo(newTodo);
            todoInput.value = '';
        }
    });

    todoList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            if (e.target.classList.contains('edit')) {
                const newText = prompt('Edit task:', todos[index].text);
                if (newText) {
                    editTodo(index, newText);
                }
            } else if (e.target.classList.contains('complete')) {
                toggleCompleteTodo(index);
            } else if (e.target.classList.contains('delete')) {
                deleteTodo(index);
            }
        }
    });

    renderTodos();
});
