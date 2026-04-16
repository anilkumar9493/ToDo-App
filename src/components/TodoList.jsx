import TodoItem from "./TodoItem"

const TodoList = ({ filteredTodos, handleToggleTodo, handleDeleteTodo, handleEditTodo }) => {

    if (filteredTodos.length === 0) {
        return (
            <div
                className="empty-state"
            >
                <div
                    className="empty-icon"
                >
                    ✓
                </div>
                <h3>There are no more tasks here.</h3>
                <p>Add a new task using the input above, or try changing the search/filter.</p>
            </div>
        );
    }

    return (
        <ul
            className='todo-list'
        >
            {filteredTodos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleToggleTodo={handleToggleTodo}
                    handleDeleteTodo={handleDeleteTodo}
                    handleEditTodo={handleEditTodo}
                />
            ))}
        </ul>
    )
}
export default TodoList