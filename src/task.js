function createTask(title, description, dueDate, priority) {
  return {
    title: title,
    description: description,
    dueDate: dueDate ? Date.parse(dueDate) : "", //check if date empty
    priority: priority,
  };
}
export default { createTask };
