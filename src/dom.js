function addProject(title) {
    let projects = document.querySelector(".projects")
    let project = document.createElement("div")
    project.classList.add("project")
    project.textContent = title
    projects.appendChild(project)
    return project;
}
function loadTodos(todos) {
    let container = document.querySelector(".container");
    container.innerHTML = "";
    for (const todo of todos) {
        let todoLI = document.createElement("div")
        todoLI.classList.add("todoLI")
        todoLI.textContent = JSON.stringify(todo)
        container.appendChild(todoLI)
    }
}

export default { addProject, loadTodos }