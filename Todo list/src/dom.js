import appLogic from "./appLogic";
import {format, parseISO} from 'date-fns';

function render() {
    const content = document.getElementById('content');
    content.innerHTML = '';

    const projects = appLogic.getProjects();
    const currentProject = appLogic.getCurrentProject();

    const projectSection = document.createElement('section');

    const projectTitle = document.createElement('h2');
    projectTitle.textContent = 'Projects';
    projectSection.appendChild(projectTitle);

    const projectList = document.createElement('ul');

    projects.forEach((project) => {
        const li = document.createElement('li');
        li.textContent = project.name;

        if(project === currentProject){
            li.style.fontWeight = 'bold';
        }

        li.addEventListener('click', () => {
            appLogic.setCurrentProject(project);
            render();
        });

        projectList.appendChild(li);
    });

    projectSection.appendChild(projectList);

    const addProjectBtn = document.createElement('button');
    addProjectBtn.textContent = 'Add project';
    addProjectBtn.id = 'add-project-btn';
    projectSection.appendChild(addProjectBtn);

    content.appendChild(projectSection);

    const todosSection = document.createElement('section');

    const todosTitle = document.createElement('h2');
    todosTitle.textContent = `Todos in: ${currentProject.name}`;
    todosSection.appendChild(todosTitle);

    const todosList = document.createElement('ul');

    currentProject.todos.forEach((todo, index) => {
        const li = document.createElement('li');

        const textSpan = document.createElement('span');
        let formattedDate = '';
        if(todo.dueDate) {
            try{
                const date = parseISO(todo.dueDate);
                formattedDate = format(date, 'MMM d, yyyy');
            } catch(e) {
                formattedDate = todo.dueDate;
            }
        }

        textSpan.textContent= `${todo.title} - ${formattedDate}`;

        if(todo.priority === 'high'){
            textSpan.style.color = 'red';
        } else if(todo.priority === 'low'){
            textSpan.style.color = "gray";
        } else {
            textSpan.style.color = 'black';
        }

        textSpan.style.cursor = 'pointer';
        textSpan.title = 'Click to edit todo';
        textSpan.addEventListener('click', () => {
            handleEditTodo(index, todo);
        });

        li.appendChild(textSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.style.marginLeft = '8px';
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            handleDeleteTodo(index);
        });

        li.appendChild(deleteBtn);

        todosList.appendChild(li);
    });

    todosSection.appendChild(todosList);

    const addTodoBtn = document.createElement('button');
    addTodoBtn.textContent = 'Add todo';
    addTodoBtn.id = 'add-todo-btn';
    todosSection.appendChild(addTodoBtn);

    content.appendChild(todosSection);
}

function setupEvents() {
    const content = document.getElementById('content');

    content.addEventListener('click', (event) => {
        if(event.target.id === 'add-project-btn'){
            handleAddProject();
        }

        if(event.target.id === 'add-todo-btn'){
            handleAddTodo();
        }
    });
}

function handleAddProject() {
    const name = prompt('Project name:');
    if(!name) return;

    appLogic.addProject(name);
    render();
}

function handleAddTodo() {
    const title = prompt('Todo title:');
    if(!title) return;

    const description = prompt('Description:') || '';
    const dueDate = prompt('Due date (YYYY-MM-DD):') || '';
    const priority = prompt('Priority (low, normal, high):') || 'normal';

    appLogic.addTodo(title, description, dueDate, priority);
    render();
}

function handleEditTodo(index, todo){
    const newTitle = prompt('Edit title:', todo.title);
    if(!newTitle) return;

    const newDescription = prompt('Edit description:', todo.description || '');
    const newDueDate = prompt('Edit due date (YYYY-MM-DD):', todo.dueDate || '');
    const newPriority = prompt('Edit priority (low, normal, high):', todo.priority || 'normal');

    appLogic.updateTodo(index, {
        title: newTitle,
        description: newDescription,
        dueDate: newDueDate,
        priority: newPriority,
    });

    render();
}

function handleDeleteTodo(index) {
    const sure = confirm('Delete this todo?');
    if (!sure) return;

    appLogic.deleteTodo(index);
    render();
}

export {render, setupEvents};