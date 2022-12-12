function addProject(project) {
    let newProject = { [project.title]: project }
    let oldProject = JSON.parse(localStorage.getItem("projects"))
    oldProject = oldProject ? oldProject : {};
    localStorage.setItem("projects", JSON.stringify(Object.assign(oldProject, newProject)))
}
function getProjects() {
    return JSON.parse(localStorage.projects)
}
function setCurrentPrj(project) {
    if (typeof project == "object")
        localStorage.setItem("currentProjects", project.title)
    else if (typeof project == "string")
        localStorage.setItem("currentProjects", project)
    else
        localStorage.setItem("currentProjects", "default")
}
function getCurrentPrj() {
    return localStorage.getItem("currentProjects")
}
export default { addProject, getProjects, setCurrentPrj, getCurrentPrj }