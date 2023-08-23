import task from "./task.js";
function addTask(projectName, title, description, dueDate, priority) {
  //get
  let projects = JSON.parse(localStorage.getItem("projects"));
  //push a new task
  projects[projectName].push(
    task.createTask(title, description, dueDate, priority)
  );
  //save
  localStorage.setItem("projects", JSON.stringify(projects));
}
function editTask(
  projectName,
  taskIndex,
  title,
  description,
  dueDate,
  priority
) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  projects[projectName][taskIndex].title = title;
  projects[projectName][taskIndex].description = description;
  projects[projectName][taskIndex].dueDate = dueDate
    ? Date.parse(dueDate) //check if date empty
    : "";
  projects[projectName][taskIndex].priority = priority;
  //save
  localStorage.setItem("projects", JSON.stringify(projects));
}

function removeTask(projectName, taskIndex) {
  let projects = JSON.parse(localStorage.getItem("projects"));
  //remove
  projects[projectName].splice(taskIndex, 1);
  //save
  localStorage.setItem("projects", JSON.stringify(projects));
}

function getTask(projectName, taskIndex) {
  return JSON.parse(localStorage.getItem("projects"))[projectName][taskIndex];
}

function getAllTasks(projectName) {
  //return Array of tasks
  return JSON.parse(localStorage.getItem("projects"))[projectName];
}

function addProject(projectName) {
  //get
  let projects = JSON.parse(localStorage.getItem("projects"));
  //add
  projects[projectName] = [];
  //save
  localStorage.setItem("projects", JSON.stringify(projects));
}
function getAllProjects() {
  if (localStorage.getItem("projects")) {
    return JSON.parse(localStorage.getItem("projects"));
  } else {
    localStorage.setItem(
      "projects",
      JSON.stringify({
        Home: [],
      })
    );
  }
  return JSON.parse(localStorage.getItem("projects"));
}

function removeProject(projectName) {
  //get
  let projects = JSON.parse(localStorage.getItem("projects"));
  //remove
  delete projects[projectName];
  //save
  localStorage.setItem("projects", JSON.stringify(projects));
}
export default {
  addTask,
  editTask,
  removeTask,
  getTask,
  getAllTasks,
  addProject,
  removeProject,
  getAllProjects,
};
