import { useRef, useState } from "react"

const TodoItem = ({ todo, handleToggleTodo, handleDeleteTodo, handleEditTodo }) => {

    const [isEditing, setIsEditing] = useState(false)
    const [editedText, setEditedText] = useState(todo.title)
    const inputRef = useRef(null)

    const startEditing = () => {
        setIsEditing(true)
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus()
            }
        }, 0)
        setEditedText(todo.title)
    }

    const cancelEditing = () => {
        setIsEditing(false)
        setEditedText(todo.title)
    }

    const saveEdit = () => {
        const edited = editedText.trim()
        if (edited === "") return;
        handleEditTodo(todo.id, editedText)
        setIsEditing(false)
    }

    return (
        <li
            className='todo-item'
            key={todo.id}
        >
            <div className="todo-left">
                <input
                    type='checkbox'
                    value={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                />
                <span
                    className={`todo-title ${todo.completed ? "completed" : ""}`}
                >
                    {isEditing ?
                        <input
                            ref={inputRef}
                            type="text"
                            className="edit-input"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") saveEdit();
                                if (e.key === "Escape") cancelEditing();
                            }}
                        /> :
                        todo.title
                    }
                </span>
            </div>
            <div className="todo-actions">
                {
                    isEditing ? (
                        <>
                            <button
                                className="save-btn"
                                onClick={saveEdit}
                            >
                                Save
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={cancelEditing}
                            >
                                Cancel
                            </button>
                        </>
                    ) :
                        (
                            <>
                                <button
                                    className="edit-btn"
                                    onClick={startEditing}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDeleteTodo(todo.id)}
                                >
                                    Delete
                                </button>
                            </>
                        )
                }

            </div>
        </li>
    )
}
export default TodoItem