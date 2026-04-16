import { useState, useEffect } from 'react'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import FilterBar from './components/FilterBar'

function App() {

  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos
        ? JSON.parse(savedTodos)
        : [
          { id: 1, title: "Learn React basics", completed: false },
          { id: 2, title: "Build Todo app", completed: true },
        ];
    } catch (error) {
      return [];
    }
  })
  const [input, setInput] = useState("")
  const [filter, setFilter] = useState('all')
  const [searchText, setSearchText] = useState("")


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) => {
    e.preventDefault()
    const trimmed = input.trim()

    if (trimmed === "") return;
    const newTodo = {
      id: Date.now(),
      title: trimmed,
      completed: false
    }
    setTodos([newTodo, ...todos])
    setInput("")
  }

  const handleDeleteTodo = (id) => {
    const updateTodos = todos.filter(item => item.id !== id)
    setTodos(updateTodos)
  }

  const handleToggleTodo = (id) => {
    const updateTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    setTodos(updateTodos)
  }

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "active"
        ? !todo.completed
        : filter === "completed"
          ? todo.completed
          : true

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchText.toLocaleLowerCase())

    return matchesFilter && matchesSearch;
  })

  const handleEditTodo = (id, updatedTitle) => {
    const edited = updatedTitle.trim()
    if (edited === "") return;
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, title: edited } : todo))
  }

  const handleSearch = (e) => {
    const trimmed = e.target.value.trim()
    setSearchText(trimmed)
  }

  const handleClearAll = () => {
    const confirmClear = window.confirm('Are you sure to clear all.')
    if (!confirmClear) return;
    setTodos([])
  }

  const remainingTodos = todos.filter((todo) => !todo.completed).length
  return (
    <div
      className='app'
    >
      <div
        className="app-header"
      >
        <div>
          <p className="eyebrow">My To-Do List</p>
          <h1>Todo App</h1>
          <p className='app-subtitle'>Plan your work, track progress, and stay consistent.</p>
        </div>
        <div className="summary-badge">
          <span>{todos.length}</span>
          <small>Total Tasks</small>
        </div>
      </div>

      <TodoForm
        input={input}
        setInput={setInput}
        handleAddTodo={handleAddTodo}
      />

      <div
        className='search-box'
      >
        <input
          type='text'
          placeholder='search for the task....'
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="toolbar">
        <p className="task-count">
          <strong>{remainingTodos}</strong> Tasks remaining
        </p>
        <div className="toolbar-actions">
          <FilterBar
            filter={filter}
            setFilter={setFilter}
          />
          <button
            className="clear-btn"
            onClick={handleClearAll}
          >
            Clear All
          </button>
        </div>
      </div>

      <TodoList
        filteredTodos={filteredTodos}
        handleToggleTodo={handleToggleTodo}
        handleDeleteTodo={handleDeleteTodo}
        handleEditTodo={handleEditTodo}
      />
    </div>
  )
}

export default App
