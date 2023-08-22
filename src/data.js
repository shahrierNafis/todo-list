import task from "./task.js";
function addTask(projectName, title, description, dueDate, priority) {
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
  console.log(dueDate);
  let projects = JSON.parse(localStorage.getItem("projects"));
  projects[projectName][taskIndex].title = title;
  projects[projectName][taskIndex].description = description;
  projects[projectName][taskIndex].dueDate = Date.parse(dueDate);
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

function addProject() {
  //   let project;
  //   storage.saveProject(project);
}
function getAllProjects() {
  if (localStorage.getItem("projects")) {
    return JSON.parse(localStorage.getItem("projects"));
  } else {
    localStorage.setItem(
      "projects",
      JSON.stringify({
        Home: [task.createTask("Task 1", "", new Date(), "green")],
      })
    );
  }
  return JSON.parse(localStorage.getItem("projects"));
}

function removeProject() {}
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
