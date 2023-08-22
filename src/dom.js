import data from "./data.js";
import { format } from "date-fns";

let currentProject = "Home";

function popTaskEditor(projectName, taskIndex) {
  let editorWindow = document.createElement("div");
  editorWindow.id = "editor-window";

  //title
  let title = document.createElement("input");
  title.type = "text";
  title.id = "title-editor";
  title.placeholder = "title";

  //closeBtn
  let closeBtn = document.createElement("div");
  closeBtn.id = "close-btn";
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", (event) => {
    //close
    document.querySelector("#editor-window").remove();
  });

  //description
  let description = document.createElement("textarea");
  description.id = "description";
  description.placeholder = "description";

  //deuDate
  let deuDate = document.createElement("input");
  deuDate.id = "dueDate";
  deuDate.type = "date";

  //priority
  let priority = document.createElement("select");
  priority.id = "priority";

  let gray = document.createElement("option");
  gray.classList.add("gray");
  gray.id = "gray";
  gray.value = "gray";
  gray.innerText = "gray";

  let green = document.createElement("option");
  green.classList.add("green");
  green.value = "green";
  green.innerText = "green";

  let orange = document.createElement("option");
  orange.classList.add("orange");
  orange.value = "orange";
  orange.innerText = "orange";

  let red = document.createElement("option");
  red.classList.add("red");
  red.value = "red";
  red.innerText = "red";

  priority.appendChild(gray);
  priority.appendChild(green);
  priority.appendChild(orange);
  priority.appendChild(red);

  //doneBtn
  let doneBtn = document.createElement("div");
  doneBtn.id = "done-btn";
  doneBtn.innerText = "done";
  doneBtn.addEventListener("click", (event) => {
    //edit
    if (projectName && taskIndex + 1) {
      data.editTask(
        projectName,
        taskIndex,
        title.value,
        description.value,
        deuDate.value,
        priority.value
      );
      //create
    } else {
      data.addTask(
        currentProject,
        title.value,
        description.value,
        deuDate.value,
        priority.value
      );
    }
    //close
    document.querySelector("#editor-window").remove();
    showAllTasks(currentProject);
  });

  //edit
  if (projectName && taskIndex + 1) {
    let task = data.getTask(projectName, taskIndex);
    title.value = task.title;
    description.value = task.description;
    deuDate.value = format(task.dueDate, "yyyy-MM-dd");
    priority.value = task.priority;
  }

  editorWindow.appendChild(title);
  editorWindow.appendChild(closeBtn);
  editorWindow.appendChild(description);
  editorWindow.appendChild(deuDate);
  editorWindow.appendChild(priority);
  editorWindow.appendChild(doneBtn);

  document.body.appendChild(editorWindow);
}

function finishTask(taskDiv) {
  //get index from sibling
  let taskIndex = taskDiv.parentNode.childNodes[0].innerText - 1;
  //remove
  data.removeTask(currentProject, taskIndex);
  showAllTasks(currentProject);
}

function popNewProject(title) {}

function popProjectDeletionConfirmation(project) {}

function showAllProjects() {
  //Clear side bar
  document.querySelector("#sidebar").textContent = "";
  let projects = data.getAllProjects();
  //get all the project name
  Object.keys(projects).forEach((project) => {
    //project element
    let projectDiv = document.createElement("div");
    projectDiv.innerText = project;
    projectDiv.classList.add("project");
    projectDiv.id = project;
    projectDiv.addEventListener("click", () => {
      //remove selected-project class from previous project
      document
        .querySelector(`#${currentProject}`)
        .classList.remove("selected-project");
      //add selected-project class to current project
      projectDiv.classList.add("selected-project");
      currentProject = project;
      showAllTasks(project);
    });
    //Project remove button
    let removeProjectBtn = document.createElement("div");
    removeProjectBtn.innerText = "X";
    removeProjectBtn.id = "remove-project-btn";
    removeProjectBtn.addEventListener("click", () => {
      popProjectDeletionConfirmation(project);
    });
    //add project remove button
    projectDiv.appendChild(removeProjectBtn);
    //add project to sidebar
    document.querySelector("#sidebar").appendChild(projectDiv);
  });
  //Add new project button
  let addProjectBtn = document.createElement("div");
  addProjectBtn.innerText = "+";
  addProjectBtn.id = "add-project-btn";
  addProjectBtn.addEventListener("click", () => {
    popNewProject();
  });
  document.querySelector("#sidebar").appendChild(addProjectBtn);
}

function showAllTasks(project) {
  document.querySelector("#main").textContent = "";
  //task element
  data.getAllTasks(project).forEach((task, index) => {
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task", task.priority);
    //taskDivHead
    let taskDivHead = document.createElement("div");
    taskDivHead.classList.add("task-div-head");
    //indexDiv
    let indexDiv = document.createElement("div");
    indexDiv.classList.add("index");
    indexDiv.innerText = index + 1;

    //finishTaskBtn
    let finishTaskBtn = document.createElement("input");
    finishTaskBtn.setAttribute("type", "checkbox");
    finishTaskBtn.classList.add("finish-task-btn");
    finishTaskBtn.addEventListener("change", (event) => {
      finishTask(event.target);
    });
    taskDivHead.appendChild(indexDiv);
    taskDivHead.appendChild(finishTaskBtn);
    //taskDivMain
    let taskDivMain = document.createElement("div");
    taskDivMain.classList.add("task-div-main");
    taskDivMain.addEventListener("click", () => {
      popTaskEditor(currentProject, index);
    });

    //titleDiv
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerText = task.title;
    //dueDateDiv
    let dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("dueDate");
    dueDateDiv.innerText = format(task.dueDate, "dd-MM-yyyy");

    taskDivMain.appendChild(titleDiv);
    taskDivMain.appendChild(dueDateDiv);

    taskDiv.appendChild(taskDivHead);
    taskDiv.appendChild(taskDivMain);
    document.querySelector("#main").appendChild(taskDiv);
  });
  //addTaskBtn
  let addTaskBtn = document.createElement("div");
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
  popProjectDeletionConfirmation,
  showAllProjects,
  currentProject,
  showAllTasks,
};
