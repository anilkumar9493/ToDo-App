const TodoForm = ({ input, setInput, handleAddTodo }) => {
    return (
        <form
            className='todo-form'
            onSubmit={handleAddTodo}
        >
            <input
                type='text'
                placeholder='What do you want to do today?'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                type='submit'
            >
                Add
            </button>
        </form>
    )
}
export default TodoForm