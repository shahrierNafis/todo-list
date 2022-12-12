import "./style.css";
import todoC from "./todo";
import projectC from "./project";
import dom from "./dom";
import data from "./data";

let prj1 = projectC("prj1")
prj1.addTodo(todoC("a", "aa", new Date(), 4, "aaa", true));
prj1.addTodo(todoC("b", "bb", new Date(), 1, "bbb", true));
data.addProject(prj1);

for (const [title, project] of Object.entries(data.getProjects())) {
    dom.addProject(title)
    if (data.getCurrentPrj() == title || data.getCurrentPrj() == "default")
        dom.loadTodos(project.todos)
}

document.querySelector(".add-project").addEventListener("click", addNewProject)

function addNewProject() {
    let title = prompt("Please enter your project name")
    let project = projectC(title)
    data.addProject(project)
    makeSwitchble(dom.addProject(project.title))
    data.setCurrentPrj(project)
    dom.loadTodos(project.todos)
}
document.querySelectorAll(".project").forEach((project) => {
    makeSwitchble(project)
})
function makeSwitchble(project) {
    project.addEventListener("click", () => switchProject(project))
}
function switchProject(p) {
    let project = data.getProjects()[p.textContent]
    data.setCurrentPrj(project)
    dom.loadTodos(project.todos)

    p.parentNode.childNodes.forEach((sibling) => { sibling.classList.remove("current") })
    p.classList.add("current")
}