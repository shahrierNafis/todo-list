function createTask(title, description, dueDate, priority) {
  return {
    title: title,
    description: description,
    dueDate: Date.parse(dueDate),
    priority: priority,
  };
}
export default { createTask };
