// select dom elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// try to load saved todos from localStorage (if any)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function SaveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list
function createtodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        SaveTodos();
    });

    // text of the todo
    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 8px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }

    // add double-click event listener to edit todo
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            SaveTodos();
        }
    });

    // delete todo button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'delete';
    delBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        SaveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li;
}

// render the whole todo list from todos array
function render() {
    list.innerHTML = '';

    todos.forEach((todo, index) => {
        const node = createtodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    todos.push({ text: text, completed: false });
    input.value = '';
    render();
    SaveTodos();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

render();