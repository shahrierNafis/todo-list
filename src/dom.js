import data from "./data.js";
import { format } from "date-fns";

let currentProject = "Home";

function popTaskEditor(taskIndex) {
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
  closeBtn.addEventListener("click", () => {
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
    if (taskIndex + 1) {
      data.editTask(
        currentProject,
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
  if (taskIndex + 1) {
    let task = data.getTask(currentProject, taskIndex);
    title.value = task.title;
    description.value = task.description;
    deuDate.value = task.dueDate //check empty dates
      ? format(task.dueDate, "yyyy-MM-dd")
      : "No date";
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

function popNewProject() {
  let newProjectWindow = document.createElement("div");
  newProjectWindow.id = "new-project-window";

  //ProjectName
  let projectName = document.createElement("input");
  projectName.type = "text";
  projectName.placeholder = "Project name";
  projectName.id = "project-name-setter";

  //closeBtn
  let closeBtn = document.createElement("div");
  closeBtn.id = "close-btn-project";
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", () => {
    //close
    document.querySelector("#new-project-window").remove();
  });

  //addBtn
  let addBtn = document.createElement("button");
  addBtn.id = "add-btn";
  addBtn.innerText = "add";
  addBtn.addEventListener("click", () => {
    //alert
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
    //close
    document.querySelector("#new-project-window").remove();
  });
  //add element
  newProjectWindow.appendChild(projectName);
  newProjectWindow.appendChild(closeBtn);
  newProjectWindow.appendChild(addBtn);

  document.body.appendChild(newProjectWindow);
}
function selectProject(project) {
  //remove selected-project class from previous project
  document
    .querySelector(`#${currentProject}`)
    .classList.remove("selected-project");

  currentProject = project;
  //add selected-project class to current project

  document
    .querySelector(`#${currentProject}`)
    .classList.add("selected-project");
  showAllTasks(project);
}
function showAllProjects() {
  //Clear side bar
  document.querySelector("#sidebar").textContent = "";
  let projects = data.getAllProjects();
  //get all the project name
  Object.keys(projects).forEach((project) => {
    //project element
    let projectDiv = document.createElement("div");
    projectDiv.classList.add("project");
    projectDiv.id = project;

    //projectName
    let projectName = document.createElement("div");
    projectName.classList.add("project-name");
    projectName.innerText = project;
    projectName.addEventListener("click", () => {
      //select project
      selectProject(project);
    });
    //Project remove button
    let removeProjectBtn = document.createElement("div");
    removeProjectBtn.innerText = "X";
    removeProjectBtn.id = "remove-project-btn";
    removeProjectBtn.addEventListener("click", () => {
      if (confirm(`Are you sure you want delete ${currentProject}`)) {
        //remove
        data.removeProject(currentProject);

        //
        selectProject("Home");
        showAllProjects();
      }
    });
    //append project name
    projectDiv.appendChild(projectName);
    //won't add project remove button to home project
    if (!(project == "Home")) {
      //append project remove button
      projectDiv.appendChild(removeProjectBtn);
    }
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
      popTaskEditor(index);
    });

    //titleDiv
    let titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.innerText = task.title;
    //dueDateDiv
    let dueDateDiv = document.createElement("div");
    dueDateDiv.classList.add("dueDate");
    dueDateDiv.innerText = task.dueDate //check empty dates
      ? format(task.dueDate, "yyyy-MM-dd")
      : "No date";

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
  selectProject,
  showAllProjects,
  currentProject,
  showAllTasks,
};
