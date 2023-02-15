window.addEventListener('load', () => {
    // declared a global variable todos so it is not declared by const or let
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    // name = username or an empty string
    const username = localStorage.getItem('username') || '';
    //name that inputed is = to username
    nameInput.value = username;

    //added a event listener on change --set and get a single string from a database
    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    }) 
    
    // to get JSON code from it
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        // to add todo
        todos.push(todo);

        // to save todos in our local storage item this turns our todo list into JSON string
        localStorage.setItem('todos', JSON.stringify(todos));

        // reset target which is the form upon submitting
        e.target.reset();
        
        // this display Todo list
        DisplayTodos();
    });
});

// function for display todos
function DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        // creating necessary elements
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal');
        }else {
            span.classList.add('business');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        edit.innerHTML = 'edit';
        deleteButton.innerHTML = 'delete';
 
        // appending elements
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }

        input.addEventListener('click', e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) {
                todoItem.classList.add('done');
            }else {
                todoItem.classList.remove('done');
            }

            DisplayTodos();
        })
        //  edit eventlistener  
        edit.addEventListener ('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })
       //   delete eventlistener
       deleteButton.addEventListener ('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
       });

    });
}