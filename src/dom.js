/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
import { format } from "date-fns";
import data from "./data";

let currentProject = "Home";
/**
 * Creates a pop-up window for editing a task.
 * @param {number} taskIndex - The index of the task being edited.
 */
function popTaskEditor(taskIndex) {
  // Create editor window
  const editorWindow = document.createElement("div");
  editorWindow.id = "editor-window";

  // Create title input
  const title = document.createElement("input");
  title.type = "text";
  title.id = "title-editor";
  title.placeholder = "title";

  // Create close button
  const closeBtn = document.createElement("div");
  closeBtn.id = "close-btn";
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", () => {
    // Close the editor window
    document.querySelector("#editor-window").remove();
  });

  // Create description textarea
  const description = document.createElement("textarea");
  description.id = "description";
  description.placeholder = "description";

  // Create due date input
  const dueDate = document.createElement("input");
  dueDate.id = "dueDate";
  dueDate.type = "date";

  // Create priority select
  const priority = document.createElement("select");
  priority.id = "priority";

  // Create priority options
  const gray = document.createElement("option");
  gray.classList.add("gray");
  gray.id = "gray";
  gray.value = "gray";
  gray.innerText = "gray";

  const green = document.createElement("option");
  green.classList.add("green");
  green.value = "green";
  green.innerText = "green";

  const orange = document.createElement("option");
  orange.classList.add("orange");
  orange.value = "orange";
  orange.innerText = "orange";

  const red = document.createElement("option");
  red.classList.add("red");
  red.value = "red";
  red.innerText = "red";

  // Append priority options to select element
  priority.appendChild(gray);
  priority.appendChild(green);
  priority.appendChild(orange);
  priority.appendChild(red);

  // Create done button
  const doneBtn = document.createElement("div");
  doneBtn.id = "done-btn";
  doneBtn.innerText = "done";
  doneBtn.addEventListener("click", () => {
    // Edit or create task based on taskIndex
    if (taskIndex + 1) {
      data.editTask(
        currentProject,
        taskIndex,
        title.value,
        description.value,
        dueDate.value,
        priority.value
      );
    } else {
      data.addTask(
        currentProject,
        title.value,
        description.value,
        dueDate.value,
        priority.value
      );
    }
    // Close the editor window and show all tasks
    document.querySelector("#editor-window").remove();
    showAllTasks(currentProject);
  });

  // Populate fields with task data if editing an existing task
  if (taskIndex + 1) {
    const task = data.getTask(currentProject, taskIndex);
    title.value = task.title;
    description.value = task.description;
    dueDate.value = task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : "No date";
    priority.value = task.priority;
  }

  // Append elements to editor window
  editorWindow.appendChild(title);
  editorWindow.appendChild(closeBtn);
  editorWindow.appendChild(description);
  editorWindow.appendChild(dueDate);
  editorWindow.appendChild(priority);
  editorWindow.appendChild(doneBtn);

  // Append editor window to body
  document.body.appendChild(editorWindow);
}

function finishTask(taskDiv) {
  // get index from sibling
  const taskIndex = taskDiv.parentNode.childNodes[0].innerText - 1;
  // remove
  data.removeTask(currentProject, taskIndex);
  showAllTasks(currentProject);
}

function popNewProject() {
  const newProjectWindow = document.createElement("div");
  newProjectWindow.id = "new-project-window";

  // ProjectName
  const projectName = document.createElement("input");
  projectName.type = "text";
  projectName.placeholder = "Project name";
  projectName.id = "project-name-setter";

  // closeBtn
  const closeBtn = document.createElement("div");
  closeBtn.id = "close-btn-project";
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", () => {
    // close
    document.querySelector("#new-project-window").remove();
  });

  // addBtn
  const addBtn = document.createElement("button");
  addBtn.id = "add-btn";
  addBtn.innerText = "add";
  addBtn.addEventListener("click", () => {
    // alert
    if (data.getAllTasks(projectName.value)) {
      alert("Project names must be different");
      return;
    }
    if (!projectName.value) {
      alert("Project names can't be empty");
      return;
    }
    data.addProject(projectName.value);
    showAllProjects();
    selectProject(projectName.value);
    // close
    document.querySelector("#new-project-window").remove();
  });
  // add element
  newProjectWindow.appendChild(projectName);
  newProjectWindow.appendChild(closeBtn);
  newProjectWindow.appendChild(addBtn);

  document.body.appendChild(newProjectWindow);
}
function selectProject(project) {
  // remove selected-project class from previous project
  document
    .querySelector(`[data-project="${currentProject}"`)
    .classList.remove("selected-project");

  currentProject = project;
  // add selected-project class to current project

  document
    .querySelector(`[data-project="${currentProject}"`)
    .classList.add("selected-project");
  showAllTasks(project);
}
function showAllProjects() {
  // Clear side bar
  document.querySelector("#sidebar").textContent = "";
  const projects = data.getAllProjects();
  // get all the project name
  Object.keys(projects).forEach((project) => {
    // project element
    const projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.setAttribute("data-project", project);

    // projectName
    const projectName = document.createElement("div");
    projectName.classList.add("project-name");
    projectName.innerText = project;
    projectName.addEventListener("click", () => {
      // select project
      selectProject(project);
    });
    // Project remove button
    const removeProjectBtn = document.createElement("div");
    removeProjectBtn.innerText = "X";
    removeProjectBtn.id = "remove-project-btn";
    removeProjectBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want delete ${currentProject}`)) {
        // remove
        data.removeProject(currentProject);

        //
        selectProject("Home");
        showAllProjects();
      }
    });
    // append project name
    projectDiv.appendChild(projectName);
    // won't add project remove button to home project
    if (!(project === "Home")) {
      // append project remove button
      projectDiv.appendChild(removeProjectBtn);
    }
    // add project to sidebar
    document.querySelector("#sidebar").appendChild(projectDiv);
  });
  // Add new project button
  const addProjectBtn = document.createElement("div");
  addProjectBtn.innerText = "+";
  addProjectBtn.id = "add-project-btn";
  addProjectBtn.addEventListener("click", () => {
    popNewProject();
  });
  document.querySelector("#sidebar").appendChild(addProjectBtn);
}

function showAllTasks(project) {
  document.querySelector("#main").textContent = "";
  // task element
  data.getAllTasks(project).forEach((task, index) => {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", task.priority);
    // taskDivHead
    const taskDivHead = document.createElement("div");
    taskDivHead.classList.add("task-div-head");
    // indexDiv
    const indexDiv = document.createElement("div");
    indexDiv.classList.add("index");
    indexDiv.innerText = index + 1;

    // finishTaskBtn
    const finishTaskBtn = document.createElement("input");
    finishTaskBtn.setAttribute("type", "checkbox");
    finishTaskBtn.classList.add("finish-task-btn");
    finishTaskBtn.addEventListener("change", (event) => {
      finishTask(event.target);
    });
    taskDivHead.appendChild(indexDiv);
    taskDivHead.appendChild(finishTaskBtn);
    // taskDivMain
    const taskDivMain = document.createElement("div");
    taskDivMain.classList.add("task-div-main");
    taskDivMain.addEventListener("click", () => {
      popTaskEditor(index);
    });

    // titleDiv
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerText = task.title;
    // dueDateDiv
    const dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("dueDate");
    dueDateDiv.innerText = task.dueDate // check empty dates
      ? format(task.dueDate, "yyyy-MM-dd")
      : "No date";

    taskDivMain.appendChild(titleDiv);
    taskDivMain.appendChild(dueDateDiv);

    taskDiv.appendChild(taskDivHead);
    taskDiv.appendChild(taskDivMain);
    document.querySelector("#main").appendChild(taskDiv);
  });
  // addTaskBtn
  const addTaskBtn = document.createElement("div");
  addTaskBtn.id = "add-task-btn";
  addTaskBtn.innerText = "+";
  addTaskBtn.addEventListener("click", () => {
    popTaskEditor();
  });
  document.querySelector("#main").appendChild(addTaskBtn);
}
export default {
  popTaskEditor,
  finishTask,
  popNewProject,
  selectProject,
  showAllProjects,
  currentProject,
  showAllTasks,
};
