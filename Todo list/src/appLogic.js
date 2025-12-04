import Project from "./project";
import Todo from "./todo";


const STORAGE_KEY = 'todo-projects';
const projects = [];
let currentProject = null;

function initApp() {

    const loaded = loadFromStorage();

    if(!loaded) {
        const defaultProj = new Project('Inbox');
        projects.push(defaultProj);
        currentProject = defaultProj;

        saveToStorage();
    }
}

function getProjects() {
    return projects;
}

function getCurrentProject() {
    return currentProject;
}

function setCurrentProject(project) {
    currentProject = project;
}

function addProject(name) {
    const p = new Project(name);
    projects.push(p);
    currentProject = p;
    saveToStorage();
}

function addTodo(title, desc, date, priority) {
    const t = new Todo(title, desc, date, priority);
    currentProject.todos.push(t);
    saveToStorage();
}

function getTodos() {
    const current = currentProject;
    return current ? current.todos : [];
}

function updateTodo(index, {title, description, dueDate, priority}){
    const todo = currentProject.todos[index];
    if (!todo) return;

    if(title !== undefined) todo.title = title;
    if(description !== undefined) todo.description = description;
    if(dueDate !== undefined) todo.dueDate = dueDate;
    if(priority !== undefined) todo.priority = priority;

    saveToStorage();
}

function deleteTodo(index) {
    if(!currentProject) return;
    currentProject.todos.splice(index, 1);

    saveToStorage();
}

function saveToStorage() {
    const plainProjects = projects.map((project) =>({
        name: project.name,
        todos: project.todos.map((todo) => ({
            title: todo.title,
            description: todo.description,
            dueDate: todo.dueDate,
            priority: todo.priority,
            completed: todo.completed,
        })),
    }));

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(plainProjects));
    } catch(e) {
        console.error('Nepavyko išsaugoti į localStorage:', e);
    }
}

function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if(!stored) return false;

    try {
        const parsed = JSON.parse(stored);

        projects.length = 0;

        parsed.forEach((p) => {
            const proj = new Project(p.name);

            proj.todos = (p.todos || []).map(
                (t) =>
                    new Todo(
                        t.title,
                        t.description,
                        t.dueDate,
                        t.priority
                    )
            );

            projects.push(proj);
        });

        currentProject = projects[0] || null;
        return true;
    } catch(e) {
        console.error('Nepavyko nuskaityti iš localStorage:', e);
        return false;
    }
}

export default {
    initApp,
    getProjects,
    getCurrentProject,
    setCurrentProject,
    addProject,
    addTodo,
    getTodos,
    updateTodo,
    deleteTodo
};