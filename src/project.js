export default function (title) {
    let todos = []
    function addTodo(todo) {
        todos.push(todo)
    }
    return { title, todos, addTodo }
}